import axios from 'axios';

export async function getChatResponse(prompt: string): Promise<string> {
    const response = await axios.post("http://localhost:11434/api/generate",
        {
            model: 'llama3',
            prompts:prompt,
            stream:false

        }
    )
    return response.data.response;
}