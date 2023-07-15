import { useState } from "preact/hooks";
import LoadingIcon from "./LoadingIcon";
import DownloadIcon from "./DownloadIcon";
import { sendEvent } from "../utils";
import BeakerIcon from "./BeakerIcon";

function Converter({
  format,
  originalFormat,
}: {
  format: string;
  originalFormat: string;
}) {
  const [fileName, setFileName] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [disabledInput, setDisabledInput] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const file = formData.get("file") as File;

    if (!(!file || file.size) && !formData.get("url")) {
      return setError("Please upload a file or enter a URL.");
    }

    setError("");

    setIsConverting(true);

    sendEvent("convert_image", {
      format,
      source: (formData.get("url") as string) ?? "file",
    });

    try {
      const response = await fetch(
        "https://TypeIt-optimization.fly.dev/convert",
        {
          method: "POST",
          body: formData,
        },
      );

      const imageBuffer = await response.arrayBuffer();

      const blob = new Blob([imageBuffer], { type: `image/${format}` });

      setDownloadUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError("Oh no! Something went wrong. Please try again.");
    } finally {
      setIsConverting(false);
    }
  }

  if (downloadUrl) {
    return (
      <div class="text-center">
        <h4 class="text-xl mt-3 mb-2 font-normal">You're all set!</h4>
        <a
          href={downloadUrl}
          download={`converted-image.${format}`}
          class="button"
        >
          <DownloadIcon />
          Download Image
        </a>

        <button
          onClick={(e) => {
            e.preventDefault();
            setDownloadUrl("");
            setFileName("");
            setDisabledInput("");
            sendEvent("convert_another", {
              format,
            });
          }}
          class="button-as-link block text-center mx-auto mt-3"
        >
          Convert Another
        </button>
      </div>
    );
  }

  if (isConverting) {
    return (
      <div class="text-center">
        <h4 class="text-xl mt-3 mb-2 font-normal">Give us a few seconds...</h4>
        <span class="block animate-spin text-sky-300">
          <LoadingIcon />
        </span>
      </div>
    );
  }

  const disabledClasses = "opacity-40 cursor-not-allowed";

  function fileIsDisabled() {
    return disabledInput === "file";
  }

  function urlIsDisabled() {
    return disabledInput === "url";
  }

  return (
    <>
      <form onSubmit={handleSubmit as any} class="mx-auto">
        <input type="hidden" name="format" value="jpeg" />

        <div class="flex flex-col gap-4 items-center mb-12">
          <div class="flex-1 w-full">
            <label>Upload a File</label>
            <div
              class={`flex flex-col sm:flex-row gap-2 relative ${
                fileIsDisabled() ? disabledClasses : ""
              }`}
            >
              <div class="bg-gray-100 hover:bg-gray-200 border-4 border-dashed border-gray-300 rounded-md flex items-center justify-center relative w-full py-8 leading-normal">
                <input
                  type="file"
                  name="file"
                  class="z-10 p-0 opacity-0 absolute w-full h-full left-0 top-0 cursor-pointer"
                  accept={`image/webp, image/avif`}
                  disabled={fileIsDisabled()}
                  onChange={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];

                    if (!file) {
                      return;
                    }

                    setDisabledInput("url");
                    setFileName(file.name);
                  }}
                ></input>

                <span class="relative z-0">
                  {fileName || "Drag or Select File"}
                </span>
              </div>
            </div>
          </div>

          <span class="text-2xl pt-5 text-gray-500 font-light">or...</span>

          <div class="flex-1 w-full">
            <label>Enter a URL</label>
            <input
              onKeyPress={() => {
                setDisabledInput("file");
              }}
              onBlur={(e) => {
                if ((e.currentTarget as HTMLInputElement).value === "") {
                  setDisabledInput("");
                }
              }}
              type="text"
              name="url"
              class={`${urlIsDisabled() ? disabledClasses : ""}`}
              placeholder={`https://example.com/image.${originalFormat}`}
            />
          </div>
        </div>

        {error && (
          <span class="text-red-500 text-center block p-6 -mt-12">{error}</span>
        )}

        <div class="flex justify-center">
          <button class="button w-full" id="submitButton">
            <BeakerIcon />
            Convert Image
          </button>
        </div>
      </form>
    </>
  );
}

export default Converter;
