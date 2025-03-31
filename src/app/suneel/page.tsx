'use client';
import {useState} from 'react';

export default function LogoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return alert('Please enter a prompt!');

    setLoading(true);
    try {
      const response = await fetch('/api/generate-logo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt}),
      });

      const data = await response.json();
      if (data.image) setImage(data.image);
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Enter logo description..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateImage} disabled={loading} className="bg-blue-500 text-white p-2 mt-2">
        {loading ? 'Generating...' : 'Generate Logo'}
      </button>

      {image && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Generated Logo:</h2>
          <img src={image} alt="Generated Logo" className="mt-2 border p-2" />
        </div>
      )}
    </div>
  );
}
