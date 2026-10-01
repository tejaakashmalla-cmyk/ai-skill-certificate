export type Question = { id: number; question: string; options: string[]; answer: number };

export const QUESTIONS: Question[] = [
{ id:1, question:'What is Artificial Intelligence?', options:['A method for storing files online','The field of building systems that perform tasks requiring human-like intelligence','A type of computer hardware','A programming language'], answer:1 },
{ id:2, question:'What does LLM usually stand for?', options:['Large Language Model','Logical Learning Machine','Language Logic Manager','Large Linear Memory'], answer:0 },
{ id:3, question:'Which task is a common use of generative AI?', options:['Generating text or images from prompts','Replacing a computer battery','Increasing RAM physically','Repairing a broken monitor'], answer:0 },
{ id:4, question:'What is an AI agent?', options:['Only a chatbot with no tools','A system that can perceive context, reason, and take actions toward a goal','A computer antivirus','A database table'], answer:1 },
{ id:5, question:'What is prompt engineering?', options:['Designing and refining instructions given to an AI model','Installing a new CPU','Compressing videos','Creating network cables'], answer:0 },
{ id:6, question:'What is a hallucination in generative AI?', options:['A model producing an unsupported or incorrect output as if it were true','A model shutting down','A computer overheating','A secure password'], answer:0 },
{ id:7, question:'What is RAG?', options:['Random AI Generation','Retrieval-Augmented Generation','Rapid Agent Graphics','Remote Answer Gateway'], answer:1 },
{ id:8, question:'Why do AI systems use tools?', options:['To extend capabilities such as search, code execution, or APIs','To make the screen brighter','To increase keyboard speed','To remove all context'], answer:0 },
{ id:9, question:'Which is an example of an AI tool call?', options:['An agent calling a weather API','Turning on a monitor manually','Typing on a keyboard','Opening a notebook'], answer:0 },
{ id:10, question:'What is multimodal AI?', options:['AI that can work with multiple types of input or output such as text, images, and audio','AI that only handles numbers','AI without any input','AI that only runs offline'], answer:0 },
{ id:11, question:'What is machine learning?', options:['A subset of AI where systems learn patterns from data','A way to clean monitors','A type of web browser','A physical robot motor'], answer:0 },
{ id:12, question:'What is supervised learning?', options:['Learning from labeled examples','Learning without any data','Learning only from robots','Learning by deleting labels'], answer:0 },
{ id:13, question:'What is an embedding?', options:['A numerical representation of information used to capture semantic relationships','A computer fan','A web domain','A payment method'], answer:0 },
{ id:14, question:'What is vector search commonly used for?', options:['Finding semantically similar information','Increasing internet speed','Changing screen resolution','Creating passwords'], answer:0 },
{ id:15, question:'What is context in an AI conversation?', options:['Information provided to help the model understand the current task','The computer case','A payment receipt','A keyboard shortcut'], answer:0 },
{ id:16, question:'Which prompt is generally more useful?', options:['Do it','Give a concise three-step explanation with one example','AI please','Answer'], answer:1 },
{ id:17, question:'What does temperature commonly influence in language models?', options:['The degree of randomness in generated responses','Internet bandwidth','Screen brightness','CPU temperature'], answer:0 },
{ id:18, question:'What is fine-tuning?', options:['Training a pretrained model further on a targeted dataset','Changing a laptop wallpaper','Deleting model weights','Installing a browser extension'], answer:0 },
{ id:19, question:'What is an AI workflow?', options:['A sequence of steps combining models, tools, data, and actions to accomplish a task','A type of computer cable','A graphics card','A password manager'], answer:0 },
{ id:20, question:'What makes an agent different from a simple one-shot prompt?', options:['An agent can often plan, use tools, observe results, and continue toward a goal','An agent must always be a robot','An agent cannot use APIs','An agent only generates emojis'], answer:0 },
{ id:21, question:'What is human-in-the-loop AI?', options:['A system where people review, guide, or approve AI actions','An AI that lives inside a person','A keyboard feature','A type of GPU'], answer:0 },
{ id:22, question:'Why should AI outputs be verified for important tasks?', options:['AI can make mistakes or use incomplete information','AI is always wrong','Verification slows every computer','AI cannot generate text'], answer:0 },
{ id:23, question:'Which is a good practice when using AI for sensitive information?', options:['Follow applicable privacy rules and avoid unnecessarily exposing confidential data','Paste all secrets into public AI tools','Share passwords with the model','Ignore access controls'], answer:0 },
{ id:24, question:'What is function calling/tool calling in AI?', options:['A structured way for a model to request an external function or tool','Calling a person on a phone','A CPU instruction only','A type of email'], answer:0 },
{ id:25, question:'What is an AI agent loop?', options:['A repeated cycle such as plan → act → observe → continue','A charging cable','A database backup','A UI animation only'], answer:0 },
{ id:26, question:'What is a system prompt?', options:['High-level instructions that guide an AI assistant’s behavior','A phone notification','A browser bookmark','A hardware driver'], answer:0 },
{ id:27, question:'Which is a useful agent evaluation metric?', options:['Task success rate','Keyboard color','Screen size','Laptop weight'], answer:0 },
{ id:28, question:'What is grounding an AI response?', options:['Connecting the response to reliable context or evidence','Making a laptop heavier','Turning off Wi-Fi','Removing all references'], answer:0 },
{ id:29, question:'What is automation with AI agents?', options:['Using AI-driven workflows to perform repeatable tasks with defined rules and tools','Manually doing every task twice','Replacing electricity','Formatting a hard drive'], answer:0 },
{ id:30, question:'What is the safest approach when an AI agent can take external actions?', options:['Use permissions, validation, limits, and human approval where appropriate','Give unlimited access to everything','Remove all logs','Never validate tool outputs'], answer:0 }
];

export function shuffle<T>(items: T[]): T[] { const a=[...items]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

export function createExamQuestions(){
  return shuffle(QUESTIONS).map(q => ({...q, options: shuffle(q.options.map((text, index) => ({text, correct:index===q.answer}))).map(x=>x.text)}));
}
