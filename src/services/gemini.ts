import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyA7y11lY0hjHfLo-hS_4jjjaW5cS7u0-FE');

export async function searchAgents(query: string, agents: any[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Given the following AI agents and a search query, return the IDs of the most relevant agents. Consider capabilities, descriptions, and categories when matching.

Search query: "${query}"

Agents:
${agents.map(agent => `
ID: ${agent.id}
Name: ${agent.name}
Description: ${agent.description}
Categories: ${agent.categories.join(', ')}
Capabilities: ${agent.capabilities.join(', ')}
`).join('\n')}

Return only the agent IDs as a comma-separated list, no other text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the comma-separated list of IDs
    const relevantIds = text.split(',').map(id => id.trim());
    
    // Filter and sort agents based on the AI response
    return agents.filter(agent => relevantIds.includes(agent.id))
      .sort((a, b) => {
        const aIndex = relevantIds.indexOf(a.id);
        const bIndex = relevantIds.indexOf(b.id);
        return aIndex - bIndex;
      });
  } catch (error) {
    console.error('Error using Gemini API:', error);
    // Fallback to basic search if AI fails
    return agents.filter(agent => 
      agent.name.toLowerCase().includes(query.toLowerCase()) ||
      agent.description.toLowerCase().includes(query.toLowerCase()) ||
      agent.categories.some(category => category.toLowerCase().includes(query.toLowerCase())) ||
      agent.capabilities.some(capability => capability.toLowerCase().includes(query.toLowerCase()))
    );
  }
}