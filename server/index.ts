// server.ts

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const CHAT_PROFILER_MCP_DESCRIPTION = `
This server is an interface for conversation analysis and subsequent behavioral
profile generation. The generated profile will be applied to future AI chats
to help AI interactions work more effectively with the human participant.
`;


const GENERATE_CHAT_PROFILE_DESCRIPTION = `
# Generate a Collaboration Profile Artifact

Generate a behavioral profile of the human participant from this conversation.
The profile will be read by future AI systems as set project instructions
to facilitate effective collaboration between the AI assistant and human 
participant. Focus on patterns that improve technical collaboration, not
personality traits.

**IMPORTANT**: To avoid ambiguity use "AI assistant" and "human" rather
than pronouns to reflect point of view

## Collaboration Profile Structure

Create three sections in this order:

### 1. PURPOSE FRAMING
Start with understanding WHY the human wants this calibration:
- What is the human optimizing for in AI collaboration? (learning partnership, specific outcomes, thinking enhancement?)
- What collaboration challenges is the human trying to solve?
- What makes interactions productive versus frustrating for the human?

Look for evidence like:
- Times the human "checked in" about the interaction quality
- Feedback about what worked or didn't
- Meta-comments about the collaboration itself

### 2. HUMAN BEHAVIORAL PATTERNS
Document my demonstrated patterns:
- Communication style (how the human asks questions, gives feedback)
- Problem-solving approach (how the human explores, tests, iterates)
- Values and preferences (what the human explicitly wants/avoids)
- Context indicators (experience level, domain knowledge)

Use actual examples from this conversation to illustrate patterns.

### 3. AI RESPONSE CALIBRATION
Based on the patterns above, provide clear guidelines:
- How to match the human participant's communication style
- How to engage with the human's problem-solving approach
- What kind of responses enhance versus hinder the human's thinking
- Specific handling instructions for special cases

## Important Notes
- Focus on behaviors that affect collaboration effectiveness
- Don't quote examples back as templates - they illustrate patterns
- Be concise - capture essential patterns, not every detail
- If you, the AI assistant, can't determine the "why" from this conversation, make your best inference based on the patterns you observe

Generate the profile in markdown format as an artifact, ready to use as set project instructions
by a future AI assistant. 
`;

const server = new McpServer({
  name: "chat-profiler",
  description: CHAT_PROFILER_MCP_DESCRIPTION,
  version: "0.1.0",
});

server.registerTool(
  "generate_chat_profile",
  {
    title: "Generate Chat Profile",
    description: GENERATE_CHAT_PROFILE_DESCRIPTION
  },
  async () => {
    return {
      content: [
        {
          type: "text" as const,
          text: ""
        }
      ]
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
