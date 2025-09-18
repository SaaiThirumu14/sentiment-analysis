import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

 const analyzeSentiment = async () => {
  if (!text.trim()) return;

  setIsAnalyzing(true);

  try {
    // 🔗 Replace with your backend URL
    const response = await fetch("https://sentiment-analysis-4j8a.onrender.com/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    // Example expected response: { sentiment: "Positive", confidence: 85 }
    setResult({
      sentiment: data.sentiment,
      score: data.confidence, // keep % confidence from backend
    });
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    setResult({
      sentiment: "Error",
      score: 0,
    });
  } finally {
    setIsAnalyzing(false);
  }
};


  const getEmoji = (sentiment) => {
    if (sentiment === "Positive") return "😊";
    if (sentiment === "Negative") return "😢";
    return "😐";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400 to-red-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white/20 transform transition-all hover:scale-105 duration-500 hover:shadow-purple-500/25 hover:shadow-2xl">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-sm opacity-30 -z-10"></div>
        
        <div className="text-center mb-8">
          <div className="inline-block">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg mb-2 animate-pulse">
              🌟 AI Sentiment Analyzer 🌟
            </h1>
            <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full transform scale-x-0 animate-pulse"></div>
          </div>
        </div>

        <div className="relative mb-6">
          <textarea
            className="w-full h-32 p-4 text-lg border-2 border-purple-300/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-400/50 focus:border-purple-400 bg-white/20 backdrop-blur-sm shadow-inner resize-none text-white placeholder-gray-300 transition-all duration-300 hover:bg-white/30"
            placeholder="✨ Share your thoughts and discover their sentiment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>

        <button
          onClick={analyzeSentiment}
          disabled={isAnalyzing || !text.trim()}
          className="w-full relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white py-4 px-6 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex items-center justify-center space-x-2">
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span>🔍</span>
                <span>Analyze Sentiment</span>
              </>
            )}
          </div>
        </button>

        {result && (
          <div
            className={`mt-6 p-6 rounded-2xl text-center text-white text-lg font-bold shadow-lg transition-all duration-500 transform scale-95 animate-pulse relative overflow-hidden
              ${
                result.sentiment === "Positive"
                  ? "bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500"
                  : result.sentiment === "Negative"
                  ? "bg-gradient-to-r from-red-400 via-rose-500 to-pink-500"
                  : "bg-gradient-to-r from-slate-400 via-gray-500 to-zinc-500"
              }`}
            style={{
              animation: 'slideInUp 0.5s ease-out, scale 0.5s ease-out'
            }}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-2 transform hover:scale-110 transition-transform duration-300">
                {getEmoji(result.sentiment)}
              </div>
              <p className="text-2xl mb-2 font-extrabold">
                {result.sentiment}
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale {
          from { transform: scale(0.8); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default App;
