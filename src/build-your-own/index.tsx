import { useEffect, useRef, useState } from "react";
import TypeIt from "typeit-react";
import CopyButton from "./CopyButton";
import {
  buildInstance,
  instanceMethodsToArray,
  processTemplate,
} from "./utils";
import type { State, EventProps } from "./types";
import Editor from "./Editor";
import { sendEvent } from "../utils";

const typeItOptions = { lifeLike: true, speed: 0, waitUntilVisible: true };

// Wrapper to ensure TypeIt renders outside Preact's render cycle
const TypeItWrapper = (props: any) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Defer rendering to next tick to avoid JSX runtime conflicts
    const timer = setTimeout(() => setShow(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return <TypeIt {...props} />;
};

const BuildYourOwn = ({ pagePath }: { pagePath: string }) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");
  const [capturedStrokes, setCapturedStrokes] = useState<any[]>([]);
  const [builtInstance, setBuiltInstance] = useState<any>(null);
  const [playerState, setPlayerState] = useState<State>("WAITING");
  const [shouldShowTypeIt, setShouldShowTypeIt] = useState(false);
  const is = (s: State) => s === playerState;
  const getEditorValue = (): string => editorRef?.current?.value || "";

  const sendDemoEvent = (name: string, props: EventProps = {}) => {
    props.page_path = pagePath;

    sendEvent(name, props);
  };

  useEffect(() => {
    if (playerState !== "RECORDING") return;

    setCapturedStrokes([]);

    // destroy the instnace.
  }, [playerState]);

  const finishRecording = (strokes: any[]) => {
    setCapturedStrokes(strokes);

    if (!is("RECORDING")) {
      return;
    }

    // -- Trigger the instance to render...
    setShouldShowTypeIt(false);
    setPlayerState("PLAYING");
    // Defer showing TypeIt to next tick to avoid JSX runtime conflicts
    setTimeout(() => setShouldShowTypeIt(true), 0);
    sendDemoEvent("Demo", {
      content: contentRef.current?.value || "",
    });

    if (contentRef.current) {
      contentRef.current.value = "";
    }
  };

  const handlePlayAgainClick = () => {
    setError("");
    sendDemoEvent("Demo :: Play Again");

    try {
      const editorValue = editorRef.current?.value;
      if (!editorValue) return;

      const { instanceMethods, options } = processTemplate(editorValue);
      const methodDetails = instanceMethodsToArray(instanceMethods);

      // Rebuild the instance queue.
      if (builtInstance) {
        return builtInstance
          .reset((i: any) => {
            i.options(options);

            methodDetails.forEach(({ methodName, args }) =>
              i[methodName](...args),
            );
          })
          .go();
      }
    } catch (e) {
      sendDemoEvent("Demo :: Error", {
        custom_instance: editorRef.current?.value || "",
      });

      setError(
        "Uh-oh! Something went wrong. Make sure you only change the <strong>options</strong> or <strong>instance methods</strong> before running it again.",
      );
    }
  };

  const handleTabbing = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!/tab/i.test(e.code)) {
      return;
    }

    e.preventDefault();

    if (editorRef.current) {
      editorRef.current.setRangeText(
        "\t",
        editorRef.current.selectionStart,
        editorRef.current.selectionStart,
        "end",
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-8">
            <h4 className="text-xl font-normal m-0">Record Your Animation</h4>

            <button
              className="button"
              disabled={!is("RECORDING")}
              onClick={() => finishRecording(capturedStrokes)}
            >
              Stop Recording
            </button>
          </div>

          <div className="mb-6">
            <Editor
              isRecording={is("RECORDING")}
              contentRef={contentRef}
              finishRecording={finishRecording}
              setPlayerState={setPlayerState}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <h4 className="text-xl font-normal mb-0">Watch Your Animation</h4>
          </div>
          <div
            ref={contentContainerRef}
            className="bg-zinc-100 border-2 border-solid border-zinc-200 p-6 rounded text-lg"
          >
            {shouldShowTypeIt && is("PLAYING") && (
              <TypeItWrapper
                className="block"
                options={typeItOptions}
                getBeforeInit={(instance: any) => {
                  const { instance: newInstance, template } = buildInstance({
                    strokes: capturedStrokes,
                    instance,
                  });

                  if (editorRef.current) {
                    editorRef.current.value = template;
                    setCapturedStrokes([]);
                    setBuiltInstance(newInstance);

                    // Animate height of textarea.
                    editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
                  }

                  return newInstance;
                }}
              />
            )}

            {!is("PLAYING") && <span>...</span>}
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h4 className="text-xl font-normal m-0">Tweak Your Animation</h4>
          <button
            className="button naked slim"
            disabled={!builtInstance}
            onClick={handlePlayAgainClick}
          >
            Play Again
          </button>
        </div>

        {error && (
          <div className="border-2 border-red-500 rounded p-3 bg-red-50 mt-6 mb-8">
            <span
              className="text-base text-red-500"
              dangerouslySetInnerHTML={{ __html: error }}
            />
          </div>
        )}

        <code className="block language-js p-6 gatsby-highlight relative !m-0">
          {getEditorValue() && (
            <CopyButton retrieveContent={() => getEditorValue()} />
          )}

          <pre>
            <textarea
              disabled={is("WAITING")}
              className="bg-inherit w-full h-[150px] ring-0 resize-none transition-all delay-100 ease-in-out duration-300 border-0 p-8 text-white"
              ref={editorRef}
              onKeyDown={handleTabbing}
              placeholder="..."
            />
          </pre>
        </code>
      </div>
    </div>
  );
};

export default BuildYourOwn;
