import { useState, useEffect } from "react";

function App() {
  const [inputQuestion, setInputQuestion] = useState(""); // For input field
  const [displayedQuestion, setDisplayedQuestion] = useState(""); // For display
  const [answer, setAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  function inputHandler() {
    console.log("Input handler called");
    const finalQuestion = inputQuestion.trim();
    const randomNumber = Math.floor(Math.random() * 200);
    
    if (finalQuestion.length > 0 && !isGenerating) {
      setDisplayedQuestion(finalQuestion); // Set question only on submit
      setAnswer(""); // Reset answer
      setIsGenerating(true);
      
      let currentMeows = 0;
      const meowInterval = setInterval(() => {
        if (currentMeows < randomNumber) {
          setAnswer(prev => prev + "Meow! ");
          currentMeows++;
        } else {
          clearInterval(meowInterval);
          setIsGenerating(false);
        }
      }, 50);
    }
  }

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      setIsGenerating(false);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-purple-600 tracking-tight">
          Meow Chat 🐾
        </h1>
        
        <div className="min-h-[200px] bg-gray-50 rounded-lg p-4 mb-6 overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-800 break-words">
            {displayedQuestion || "Type something to hear me meow!"}
          </h2>
          {answer && (
            <h2 className="text-lg text-pink-600 mt-2 animate-pulse break-words">
              {answer}
              {isGenerating && <span className="inline-block w-2 h-2 bg-pink-600 rounded-full animate-bounce ml-1" />}
            </h2>
          )}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            disabled={isGenerating}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Ask me anything..."
          />
          <button
            onClick={inputHandler}
            disabled={isGenerating}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 active:bg-purple-700 transition-colors duration-200 font-medium disabled:bg-purple-300 disabled:cursor-not-allowed"
          >
            {isGenerating ? "Meowing..." : "Send"}
          </button>
        </div>
      </div>

      <div className="fixed top-10 left-10 text-3xl animate-bounce">🐱</div>
      <div className="fixed bottom-10 right-10 text-3xl animate-bounce">😺</div>
    </div>
  );
}

export default App;