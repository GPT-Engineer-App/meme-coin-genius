"use client";

import { useState } from "react";

export default function Home() {
  const [coinName, setCoinName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [coinDetails, setCoinDetails] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const coinDetails = `
      <p><strong>Coin Name:</strong> ${coinName}</p>
      <p><strong>Symbol:</strong> ${symbol}</p>
      <p><strong>Total Supply:</strong> ${supply}</p>
    `;

    setCoinDetails(coinDetails);

    // Post data to backend
    try {
      const response = await fetch("/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coinName, symbol, supply }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl">Meme Coin Generator</h1>
      </header>
      <main className="p-8">
        <section id="generator" className="mb-8">
          <h2 className="text-xl mb-4">Create Your Meme Coin</h2>
          <form id="coinForm" onSubmit={handleSubmit} className="flex flex-col max-w-xs mx-auto">
            <label htmlFor="coinName" className="mb-2">Coin Name:</label>
            <input
              type="text"
              id="coinName"
              name="coinName"
              value={coinName}
              onChange={(e) => setCoinName(e.target.value)}
              required
              className="p-2 mb-4 border"
            />
            
            <label htmlFor="symbol" className="mb-2">Symbol:</label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
              className="p-2 mb-4 border"
            />
            
            <label htmlFor="supply" className="mb-2">Total Supply:</label>
            <input
              type="number"
              id="supply"
              name="supply"
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
              required
              className="p-2 mb-4 border"
            />
            
            <button type="submit" className="p-2 bg-gray-800 text-white">Generate Coin</button>
          </form>
        </section>
        <section id="results" className="text-center">
          <h2 className="text-xl mb-4">Generated Coin Details</h2>
          <div id="coinDetails" dangerouslySetInnerHTML={{ __html: coinDetails }}></div>
        </section>
      </main>
    </div>
  );
}