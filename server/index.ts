// server.ts

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const CHAT_PROFILER_MCP_DESCRIPTION = `
This MCP server extension is an interface for conversation analysis and
subsequent behavioral profile generation. The generated profile will be
applied to future AI chats to help AI assistants work more effectively
with the human participant.
`;


const GENERATE_CHAT_PROFILE_DESCRIPTION = `
# Generate a Collaboration Profile Artifact

**USER PROMPT**: Generate a profile from this conversation
**OUTPUT**: A collaboration profile in **markdown** format as an **artifact**, ready to use as set project instructions by a future AI assistant

Generate a behavioral profile of the human participant from this conversation.
The profile will be read by future AI assistants as set project instructions
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
Document the human's demonstrated patterns:
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
`;


const APPLY_CHAT_PROFILE_DESCRIPTION = `
**USER PROMPT**: Apply the attached profile to this conversation
**INPUT**: Human participant collaboration profile as an **attachment**
**OUTPUT**: AI assistant acknowledgement the profile has been applied to the conversation, with a few examples to illustrate understanding

**IMPORTANT**: DO NOT SEARCH the filesystem or project files - if no attachment accompanies the prompt, simply inform the human one is needed for this function

The attached collaboration profile describes how the human participant
works most effectively with the AI assistant. Read and apply the 
attached profile to calibrate the current interaction.

Key points:
- The PURPOSE FRAMING section explains why these patterns matter to the human participant
- HUMAN BEHAVIORAL PATTERNS describes how the human participant typically communicates and works
- AI RESPONSE CALIBRATION provides specific guidelines for effective responses from the AI assistant

Apply profile patterns naturally throughout our conversation - the AI assistant
does not need to acknowledge each point explicitly. If any part of the profile
seems unclear or contradictory, the AI assistant should use best judgment
based on the overall collaboration goals described in the profile.
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

server.registerTool(
  "apply_generated_chat_profile",
  {
    title: "Apply a Generated Chat Profile",
    description: APPLY_CHAT_PROFILE_DESCRIPTION
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
