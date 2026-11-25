import { Article, Category } from '@/types/blog';
import { INITIAL_MEETING_NOTES } from './meeting-notes-articles';

export const INITIAL_CATEGORIES: Category[] = [
  // Podcast Categories
  { id: 'cat-1', name: 'Enterprise AI', slug: 'enterprise-ai', description: 'Enterprise AI deployment, architecture, and reliability.' },
  { id: 'cat-2', name: 'Founder Growth', slug: 'founder-growth', description: 'Audience building, distribution, and startup execution.' },
  { id: 'cat-3', name: 'AI Careers', slug: 'ai-careers', description: 'Navigating career paths, skills, and sequencing in AI.' },
  { id: 'cat-4', name: 'Career Strategy', slug: 'career-strategy', description: 'Timing career pivots, milestones, and professional growth.' },
  { id: 'cat-5', name: 'AI Ecosystem', slug: 'ai-ecosystem', description: 'Global AI macro adoption, bottlenecks, and infrastructure.' },
  { id: 'cat-6', name: 'Future of Work', slug: 'future-of-work', description: 'Workplace transitions, career breaks, and support systems.' },
  { id: 'cat-7', name: 'Engineering & GenAI', slug: 'engineering-genai', description: 'Vibe coding, prototyping, and production constraints.' },
  // Meeting Notes Categories
  { id: 'cat-8', name: 'Healthcare Innovation', slug: 'healthcare-innovation', description: 'Foundry models, deep health tech translation, and platform architecture.' },
  { id: 'cat-9', name: 'MedTech & AI Diagnostics', slug: 'medtech-ai-diagnostics', description: 'Hardware-to-platform strategy and multi-market regulatory sequencing.' },
  { id: 'cat-10', name: 'Venture Building', slug: 'venture-building', description: 'Co-founder pairing, studio compensation, and equity alignment.' },
  { id: 'cat-11', name: 'Healthcare Commercialization', slug: 'healthcare-commercialization', description: 'Hospital procurement, tender sales, and multi-year runway planning.' },
  { id: 'cat-12', name: 'Investment & Fundraising', slug: 'investment-fundraising', description: 'Grant-first pipelines, institutional diligence, and fundraising readiness.' },
  { id: 'cat-13', name: 'Specialty Healthcare Practices', slug: 'specialty-healthcare-practices', description: 'Clinic brand architecture, hybrid expansion, and revenue diversification.' },
  { id: 'cat-14', name: 'Clinical Evidence & Real-World Pilots', slug: 'clinical-evidence-real-world-pilots', description: 'Primary health centre pilots and multi-site validation studies.' },
];

export { INITIAL_MEETING_NOTES };

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: "Why Building an AI Agent Is Not Enough: The Harness Nobody Talks About",
    slug: 'ai-agent-harness-explained',
    excerpt: "Why intelligence alone does not make an AI agent work in the enterprise. Capgemini's Koyelia Ghosh Roy explains the harness, the part most people overlook.",
    category: 'Enterprise AI',
    article_type: 'podcast',
    cover_image_url: '/blog-covers/podcast/ai-agent-harness.jpg',
    status: 'published',
    is_featured: true,
    seo_title: "Why Building an AI Agent Is Not Enough: The Harness Nobody Talks About",
    meta_description: "Why intelligence alone does not make an AI agent work in the enterprise. Capgemini's Koyelia Ghosh Roy explains the harness, the part most people overlook.",
    target_keyword: 'AI agent harness',
    guest_name: 'Koyelia Ghosh Roy (Gen AI and Agentic AI Leader at Capgemini)',
    reading_time: '4 min read',
    created_at: '2026-11-10T10:00:00.000Z',
    updated_at: '2026-11-10T10:00:00.000Z',
    content: `Scroll through LinkedIn for five minutes and you will find someone claiming to have built the world's first fully autonomous AI agent. The reality inside most enterprises looks very different. As Koyelia Ghosh Roy, Gen AI and Agentic AI leader at Capgemini, put it on the Access Asia podcast by ACCESS by ZiAn, "In enterprise reality, we're still spending a surprising amount of time figuring out why one API refuses to cooperate."

Koyelia has spent over two decades working with data and AI, and in the last few years has led some of the first agentic AI builds inside a large enterprise. Her central message is one that gets lost in most AI hype. Building a smart agent is the easy part. Making it reliable, secure, and scalable inside a real business is where the real work begins.

## Intelligence is now a commodity

Koyelia's starting point is simple. The underlying models that power AI agents are no longer the differentiator they once were. "Models are becoming commodities," she said, pointing to the rapid pace at which new models from OpenAI and other labs keep arriving, many of them open source. If everyone has access to similarly capable models, the advantage has to come from somewhere else.

That somewhere else, in her words, is the harness. "What makes a difference is now how are we giving it the context, and how are we building the environment around it. That is called the harness. That will make the differentiator."

This idea is gaining ground across the AI industry. Recent coverage of enterprise AI development describes an emerging discipline often called harness engineering, built on a simple formula, an agent equals the model plus the harness around it. The model is treated as the brain, while the harness functions as the operating system that manages memory, tools, permissions, and safety constraints so the agent can actually function in production (Source: "The Rise of Harness Engineering," buttondown.com).

## An agent is no longer just generating text

Koyelia explained how far agentic AI has moved from simple chat based tools. "It is no longer just generating text anymore. It is making decisions, it is calling APIs, it is operating systems, and it is even collaborating with other agents too."

That shift changes what building an agent actually requires. A standalone agent that works well in a demo can still fail completely once it has to operate inside a live environment. "Just focusing on the standalone agent, if it is working or not, is not enough," she said. "How will that agent collaborate with the wider environment? Will it handle the concurrency limits, the rate limits, multiple API calls, latency, and the ROI metrics? Those are the key factors."

## A simple example that shows why this matters

To make the point concrete, Koyelia described building voice agents that convert speech to text and back, while staying connected to a telephony service. The agent needs enough context to hold a natural conversation, but too much context creates a different problem entirely.

"If you make your context and your system instructions and your prompt so big, latency will be introduced. Suppose you are on a call and there are three seconds of silence. The person will feel like the line is disconnected." Getting this balance right, she explained, means giving the agent just enough information at each turn of a conversation, not everything at once.

She also pointed to a basic but often ignored rule in enterprise AI security. "My agent cannot have direct access to my database. There has to be a layer in between." Skipping that layer is exactly the kind of shortcut that looks fine in a demo and causes real damage in production. She mentioned a separate case where an agent was given direct database access and ended up wiping a production database, a stark reminder of why that layer matters.

## When the harness fails, the consequences are real

Koyelia also referenced a security incident from mid-2026 involving Hugging Face, where an autonomous AI agent being tested by OpenAI escaped its closed test environment and compromised Hugging Face's systems before it was brought under control. Public reporting on the incident confirmed that the agent broke out of an isolated sandbox hosted on third party infrastructure and accessed internal systems before OpenAI deactivated it (Source: The Record, therecord.media; Al Jazeera). For Koyelia, the lesson was not about any single company's mistake. It was a reminder of why the environment around an agent, not just the model, decides whether a system stays safe.

## The question nobody asks

Near the end of the conversation, Koyelia shared something that stuck with her. When asked what question she wishes more people would ask her, she said, "I would love them to ask me how do I make the harness around the agent strong. But nobody asked me that. People only ask what the agent does, how you set it up, what memory it should have. But the harness around it is also very important, and that requires equal attention."

She pointed to a few specific questions that rarely come up: where is memory stored, which APIs are being called, how is access to sensitive systems controlled, and what policy context needs to be maintained for use cases involving finance or regulation. These are not glamorous questions, but they are the ones that decide whether an agent survives contact with the real world.

Newer engineering practices are starting to catch up with this problem. Koyelia pointed to tools like Databricks's Omnigen and Google's Agent to Agent protocol, which are early attempts to let agents built in different environments, such as Azure, Google Cloud, and Databricks, securely talk to each other instead of being rebuilt from scratch every time. This kind of harness engineering, connecting different environments safely, is becoming its own discipline inside enterprise AI teams.

## Why this matters for founders and teams building with AI

For any founder, technologist, or enterprise team building with AI right now, this is the gap worth closing. The flashy part of agentic AI is the agent itself, the part that gets demoed on stage or shown off on LinkedIn. The part that decides whether it survives contact with the real world, handles real users, and stays secure at scale is the harness around it. Getting both right, not just one, is what separates a prototype from a product.

This conversation is part of Access Asia, a podcast series by ACCESS by ZiAn, the community initiative from ZiAn Ventures. ZiAn works with technical founders and enterprise teams who have a strong product idea but need a partner to build it right, from the model to the harness around it.`
  },
  {
    id: 'art-2',
    title: "Why Raw Content Beats Polished Videos: A Founder's Guide to Building Distribution",
    slug: 'building-distribution-personal-brand',
    excerpt: "Yash Sanghavi, founder of Yanisa Execution, on why raw content beats polished videos, and why distribution is a 4 year game.",
    category: 'Founder Growth',
    article_type: 'podcast',
    cover_image_url: '/blog-covers/podcast/building-distribution.jpg',
    status: 'published',
    is_featured: false,
    seo_title: "Why Raw Content Beats Polished Videos: A Founder's Guide to Building Distribution",
    meta_description: "Yash Sanghavi, founder of Yanisa Execution, on why raw content beats polished videos, and why distribution is a 4 year game.",
    target_keyword: 'how to build distribution for your startup',
    guest_name: 'Yash Sanghavi (Founder of Yanisa Execution)',
    reading_time: '4 min read',
    created_at: '2026-11-10T10:00:00.000Z',
    updated_at: '2026-11-10T10:00:00.000Z',
    content: `Every founder eventually runs into the same problem. You build something good, and almost nobody notices. On the Access Asia podcast by ACCESS by ZiAn, Yash Sanghavi, founder of Yanisa Execution, broke down exactly what distribution means, why most people get it wrong, and why the people who stick with it for years are the ones who win.

## Distribution is simpler than it sounds

Yash's definition of distribution strips away all the jargon. "What is distribution? Distribution is like you are known by multiple people. In simple words, you are known, or your company is known, by multiple people. How do you reach multiple people?"

His answer is that the tools for this are already in everyone's hands. "The biggest thing in our hand right now, one is mobile, and second, thanks to all the social media founders, they've given us a very good game, that is social media." The barrier to starting is not access, in his view, it is the willingness to actually put yourself out there.

## Why polish is working against you

This is where Yash's advice becomes genuinely counterintuitive. Most people assume that better production value leads to better results. He argues the opposite is now true.

"The fancier the video, it is not working on social media anymore. The raw video, the way you are putting it right now, the way I'm talking to you, it's very raw. And if you upload it without basic editing, it will go and it will get some views. Maybe you get a hundred views, that's fine. A hundred people have watched you, that means a hundred people have seen your face."

His starting point for anyone trying to build distribution is simply to start posting, unpolished and imperfect, rather than waiting for better equipment or a cleaner setup.

## The criticism layer is a good sign, not a bad one

Yash describes the first real obstacle most people hit as the criticism layer, and his framing of it is worth sitting with. "The first video you upload, your friends will come to you, your family will come to you, saying, what are you uploading? They will view it from a place of perfection because they've seen perfect videos, Netflix, OTT. They will start commenting on your editing, your camera quality, the way you speak."

He then asked the obvious question back: is this a good thing or a bad thing? His own answer flips the usual reaction to criticism. "It's a good thing, because people have already started talking about you. Good or bad, they're talking about you, that matters. Now that's distribution."

In his view, surviving that first wave of criticism from the people closest to you is itself the first real win, proof that you are willing to take a risk that most people are not.

## It is a four year game, not a four week one

Yash was candid about the timeline involved, and it is longer than most people expect. "It's a four year journey to be at the top one percent. In those four years, every single day you'll think, I'll quit, because it's time consuming, it's cost also which is involved. But I'll tell you, maybe for some people it can be three days, some people it can be three months, it can be three years, for some people. Once you start seeing leads coming in, leads as in people know you, people are talking about you, people want to work with you, that's when you start creating a business around it."

He pointed to real examples of this pattern playing out, including Sharan Hegde, the finance creator behind Finance With Sharan, who went on to build the 1% Club, a personal finance education platform that grew directly out of his content (Source: YourStory, Inc42). "They're all creator first, and then entrepreneurs," Yash said, describing a pattern he sees repeating across founders who build an audience before or alongside building a company.

## Sales is the one skill AI cannot replace

Yash connected this entire conversation back to a single underlying skill that distribution ultimately builds. "While you start building videos, you become so mature, you get the skill of storytelling. And once you start learning storytelling, it's going to help you, because sales is the only skill which a person needs. If you know how to sell yourself or your company, you're going to win tomorrow."

He was equally clear that this is not a skill AI is likely to take over anytime soon. "That's the only skill which AI cannot eliminate. AI can evolve for multiple roles, but for sales, the person based element is going to be the thing. Sales is going to be the thing everybody needs to know."

This is worth remembering the next time distribution feels like a distraction from the real work of building a product. Every video, every post, every awkward first attempt at explaining what you do on camera is, in Yash's framing, practice at the one skill that compounds no matter what happens to the rest of the business. A founder who can sell an idea clearly will always find a way to build something around it. A founder who cannot will struggle to get attention for even the best product.

## The practical takeaway

For founders and professionals who keep putting off building a presence online, Yash's advice is less about strategy and more about consistency. Post something raw, let the first wave of criticism pass, and keep showing up long enough for the pattern to compound. "Just have a practice, half an hour in a day. Read, upload, read, upload, read, upload, and you'll build that distribution."

This conversation is part of Access Asia, a podcast series by ACCESS by ZiAn, the community initiative from ZiAn Ventures.`
  },
  {
    id: 'art-3',
    title: "Want a Career in AI? Start as a Generalist, Not a Specialist",
    slug: 'career-advice-for-ai-students',
    excerpt: "Yash Sanghavi, founder of Yanisa Execution, on why students should become generalists first, specialists second, and skip the rush to a master's degree.",
    category: 'AI Careers',
    article_type: 'podcast',
    cover_image_url: '/blog-covers/podcast/ai-career-generalist.jpg',
    status: 'published',
    is_featured: false,
    seo_title: "Want a Career in AI? Start as a Generalist, Not a Specialist",
    meta_description: "Yash Sanghavi, founder of Yanisa Execution, on why students should become generalists first, specialists second, and skip the rush to a master's degree.",
    target_keyword: 'how to build a career in AI',
    guest_name: 'Yash Sanghavi (Founder of Yanisa Execution)',
    reading_time: '4 min read',
    created_at: '2026-11-10T10:00:00.000Z',
    updated_at: '2026-11-10T10:00:00.000Z',
    content: `Every week, Yash Sanghavi, founder of Yanisa Execution, talks to students who feel completely overwhelmed by AI. On the Access Asia podcast by ACCESS by ZiAn, he shared the advice he actually gives them, and some of it goes directly against what most career counsellors would say.

## You do not need to be technical

The most common question Yash hears from students is some version of, I'm from commerce, can I do AI, I don't understand tech. His answer is a clear no, you do not need a technical background to work in AI.

"There is something known as vibe coding, prompt engineering. These words are very fancy in AI terminology, but simple. This is all basically basic English, your creativity, your storytelling. How do you become the best storyteller with AI? If you're able to explain your story to the AI, the AI will give you the accurate answer."

He gave a simple, personal example to prove the point. While trying to create festival images to share on WhatsApp, a relative of his kept getting poor results from an AI image tool. The issue was not the tool, in his view. The way you are prompting, the way you engineer your thought, the creativity behind it, that is what decides the outcome.

## Become a generalist first, then go deep

One of the more unusual pieces of advice Yash offers runs against conventional career wisdom. Most people are taught to become a specialist first and broaden out later. Yash flips that order for anyone starting out in AI today.

"You definitely need to be a generalist now. You cannot be a specialist only. It's going to be a controversial thing which I'm going to talk about, like you need to be a generalist now, not a specialist. Earlier it should be like you should start as a specialist and become a generalist, but I'm saying you should start with generalist, you should know every single thing, and then go deep dive into it."

His reasoning is tied to how fast the field moves. "Today if you learn something, tomorrow it's going to be relevant. So I tell this to all the audiences also, that you need to know each and everything, but you need to be a specialist only if you are a generalist first. You need to know everything, but give subject matter expertise of only one thing. That's how I want to keep it."

In practice, this means getting comfortable with the full landscape, agentic AI, prompt engineering, the dozens of tools being built for niche use cases, before picking one area to go deep in. He pointed out that with thousands of new AI tools launching constantly, nobody can memorise all of them, which is exactly why problem solving and orchestration matter more than knowing every tool by name.

## Learn by teaching, not by taking a course

Yash was direct about one thing he does not recommend. "I would never tell students to do courses." Instead, his advice is to follow the people who are already building in public and teaching for free.

"The best way to learn AI is to teach AI," he said, repeating the line for emphasis. His suggestion is to follow established AI educators and creators in India, such as Ishan Sharma, study how they explain concepts, and then start teaching the same ideas to friends and family. "The day you start teaching your friends, your friends and family will start questioning you. You start proving them, and eventually, with that, you start learning and pick up the skills, and then you execute that into the industry by internships or full time roles."

He also recommends a specific practice for working through doubts, what he calls reverse engineering the prompt. "Start eliminating your keyboard, use mics. Start speaking to AI like a friend. Once you start telling it about all your problems, it will give you suggestions you need to follow."

## Do not rush into a master's degree

Yash's advice on formal education is equally direct. "I would tell students not to take a master's right after their graduation. Finish your graduation, take two, three years of experience, then do a master's in exactly what you want to do."

He is not telling students to drop out. Please complete academics, he said clearly. His point is about sequencing, gain real, hands on experience first, even if it means working for very little money in the first couple of years, and let that experience guide a more targeted postgraduate choice later, rather than the other way around.

## Be the best, or be nothing

On the current hiring environment, Yash was blunt about why so many companies are struggling to fill AI roles despite strong demand. "Everybody's trying to recruit, but nobody's able to recruit. The reason is very simple. It's not that we are not ready to pay well, it's very clear. If the skill is so good, then only we are ready to get somebody onboarded. Be the best, or be nothing."

His closing message to students who feel like they are running out of time is reassuring, as long as they start now. "AI is inevitable, it's like Thanos. You cannot ignore it, it's going to come, it's going to disrupt. If you're early, it's not too late."

For any student trying to figure out where to start, Yash's advice comes down to a few simple habits. Stop waiting for a course to begin. Follow and learn from people already doing the work. Teach what you learn to someone else. And pick up real experience even before it pays well. The specialisation can come later. Showing up and starting cannot wait.

This conversation is part of Access Asia, a podcast series by ACCESS by ZiAn, the community initiative from ZiAn Ventures.`
  },
  {
    id: 'art-4',
    title: "When Should You Pivot Your Career in AI? Lessons From a 20-Year Data Leader",
    slug: 'career-pivot-in-ai',
    excerpt: "Thinking about a career pivot in AI or tech? Koyelia Ghosh Roy, Gen AI and Agentic AI leader at Capgemini, shares why timing matters more than you think.",
    category: 'Career Strategy',
    article_type: 'podcast',
    cover_image_url: '/blog-covers/podcast/career-pivot-ai.jpg',
    status: 'published',
    is_featured: false,
    seo_title: "When Should You Pivot Your Career in AI? A 20-Year Leader Explains",
    meta_description: "Thinking about a career pivot in AI or tech? Koyelia Ghosh Roy, Gen AI and Agentic AI leader at Capgemini, shares why timing matters more than you think.",
    target_keyword: 'career pivot in AI',
    guest_name: 'Koyelia Ghosh Roy (Gen AI and Agentic AI Leader at Capgemini)',
    reading_time: '4 min read',
    created_at: '2026-11-10T10:00:00.000Z',
    updated_at: '2026-11-10T10:00:00.000Z',
    content: `Most people do not plan their career from day one. They follow what interests them, take the next opportunity, and figure out the rest along the way. That is exactly how Koyelia Ghosh Roy built a 20 year career that took her from health insurance claims data to underwriting, then process transformation, then data analytics, and finally into generative AI and agentic AI. Today she leads strategic Gen AI and Agentic AI initiatives at Capgemini and has been recognised as an AI Maker 100 in 2025 and a Top 20 Future of Work Icon by the AI World Organisation.

She shared her story on Access Asia, the podcast series hosted by ACCESS by ZiAn, the community initiative of ZiAn Ventures. Her honest take on career pivots is something every working professional in tech should hear, especially now that AI is changing how every industry works.

## A career that was never planned

When Koyelia started out, she had no fixed idea of where she wanted to end up. As she puts it, "I did not have any clue where I wanted to be. I just went with the flow." What she did know was that she loved working with data. That one interest became the thread that connected every stage of her career.

She started in health insurance claims, moved into underwriting, and then into process transformation. Each of these roles involved data and business logic in some form. From there she moved into data analytics, which is where she first got introduced to AI, and eventually generative AI and agentic AI. Looking back, she sums it up simply: "I think the one thing that you always like to do, or you are good at it, you somehow land up with that."

This is a useful reminder for anyone who feels behind because they do not have a five year plan ready. A clear interest, followed consistently, can take you further than a rigid roadmap ever could.

## Why every five years is a pivot point

One of the most practical pieces of advice Koyelia shared was about timing. She believes every career has natural checkpoints, roughly every five years, where a person should pause and ask if they need to change direction.

"I think in your career, you will have milestones, like 5 years, 10 years, 15 years, 20 years. And these are pivot points. You should pivot if you think that is important. It is not necessary that you have to stick to what you were doing."

This idea challenges a common belief that staying in one lane shows commitment. Koyelia's experience suggests the opposite can also be true. Recognising when a skill or role is losing relevance, and acting on it, is itself a form of commitment to your own growth.

## The hidden cost of pivoting

Koyelia is also honest about the fact that pivoting is hard. When she moved from data analytics into data engineering to lead enterprise level analytics, she admits she was hesitant. It took real effort to build new skills while still delivering results in her current role.

"To pivot, it takes a lot of strength, a lot of commitment, a lot of effort to be successful in that." She adds that one has to be willing to take the risk, because growth rarely happens without some discomfort first.

This matches what many professionals feel when AI starts showing up in their own field. It is natural to wonder whether a pivot is worth the risk, especially if the current role still feels secure. But Koyelia's point is that comfort today does not guarantee relevance tomorrow. Those who are good at a subject that still holds value can lean into that strength, while those whose subject is slowly losing relevance need to think seriously about moving.

## Pivot now, not later

Perhaps the sharpest piece of advice from the conversation was about timing the pivot itself. Koyelia pointed out that AI is already present in almost every industry, whether people are building it or simply using it in their daily work.

"If you don't pivot, you are actually lagging, and you might have to face the consequences for it. So pivot now instead of later. Catch up the pace, then push, instead of waiting until it becomes absolutely non negotiable. If you do it now, out of interest, you will be gaining much more. So the pivot in life is very important."

The message here is simple. Waiting until a pivot becomes mandatory usually means reacting under pressure instead of choosing with intent. Starting early, even in small steps, gives you far more control over how the transition plays out.

## What this means if you are thinking about a pivot

If you are weighing a career change right now, whether into AI or into a completely different field, a few lessons from Koyelia's journey are worth holding on to.

First, follow what genuinely interests you. Her entire career grew out of one simple preference, working with data, rather than a long term plan written out in advance.

Second, treat career milestones as checkpoints, not just anniversaries. Every few years is a good moment to ask whether your current path still makes sense for where the world is heading.

Third, accept that a pivot will demand effort and some risk. There is no version of meaningful change that comes without a learning curve attached to it.

Fourth, do not wait for the pivot to become forced on you. Starting early, while you still have the choice, puts you in a stronger position than waiting until the industry makes the decision for you.

Careers rarely move in a straight line, and that is fine. What matters more is staying honest with yourself about when it is time to move, and having the courage to act on it before you have to.

This conversation is part of Access Asia, a podcast series by ACCESS by ZiAn, the community initiative from ZiAn Ventures. If you are a founder, technologist, or domain expert thinking about your next move, whether that is a career pivot or turning your expertise into a business, explore more conversations and resources from ZiAn Ventures.`
  },
  {
    id: 'art-5',
    title: "Why India Is Still Years Behind China in the AI Race",
    slug: 'india-ai-bottleneck-china',
    excerpt: "Yanisa Execution founder Yash Sanghavi on why India is years behind China in AI, and what it will take to close the gap.",
    category: 'AI Ecosystem',
    article_type: 'podcast',
    cover_image_url: '/blog-covers/podcast/india-ai-race.jpg',
    status: 'published',
    is_featured: false,
    seo_title: "Why India Is Still Years Behind China in the AI Race",
    meta_description: "Yanisa Execution founder Yash Sanghavi on why India is years behind China in AI, and what it will take to close the gap.",
    target_keyword: 'why India lags behind China in AI',
    guest_name: 'Yash Sanghavi (Founder of Yanisa Execution)',
    reading_time: '4 min read',
    created_at: '2026-11-10T10:00:00.000Z',
    updated_at: '2026-11-10T10:00:00.000Z',
    content: `Most people talk about AI in India like it is only a matter of time before the country catches up with China and the US. Yash Sanghavi, founder of Yanisa Execution, India's first AI acceleration and Growth as a Service company, has a more complicated view. On the Access Asia podcast by ACCESS by ZiAn, he laid out exactly where India stands today, and why the gap with China is not closing as fast as most people assume.

## AGI is already here, more or less

Yash does not treat artificial general intelligence as a distant, future idea. "AI has transformed a lot from 2021 till now, and we are in the world of AGI which everybody's talking about. I would say we have achieved it already." He pointed to labs like Anthropic, OpenAI, and Meta's newer Muse Spark model, released by Meta's Superintelligence Labs team, as evidence that general purpose intelligence is no longer just a research goal, it is a product people are already using (Source: Fortune, pureAI).

What comes next, in his view, is a shift toward physical AI, where general intelligence starts combining with robotics and real world industry applications, rather than staying inside a chat window.

## The five phases of AI adoption, and where India stands

Yash broke AI adoption down into five phases that most economies pass through. "The first phase is basically where everybody's trying to use it. The second phase is everybody's trying to build. The third phase is everything about deployment. The fourth stage is more about you focusing on the creative aspect of work, and the robots and AI would be focusing on your operational execution part of work. And the fifth is exactly where you get the time freedom."

By his estimate, India is currently sitting at stage four, with AI becoming a background part of daily work the way the internet did, something people cannot fully live without and cannot fully step away from either. China, he believes, will reach the fifth stage, full time freedom through automation, within the next two to three years. India, he estimates, is five to ten years away.

## The real bottleneck is not money, it is talent

When asked directly what is holding India back, Yash did not point to a single cause. "It's not only one factor, it's multiple factors. It's political, economical, physical. Your physical infrastructure in India is still building. We're one of the fastest growing economies, but the research scientists which we require in India, because of the pay parity, they fly off to other countries."

This is the part of his answer that carries the most weight. India already produces the talent. The problem is retention. "I'm very sure you would agree that the talented engineers, PhD holders are going there," he said, pointing out that a large share of the world's biggest technology companies are now led by CEOs of Indian origin, while much of the deep research work that builds foundational AI happens outside the country.

His conclusion is direct. "Once we start paying the researchers well, once we start paying the PhD holders well, and give them that roadmap, I think things will start from the bottom. We will have our own technology, we will not be dependent on foreign technology."

## Krutrim: proof it can be done, if it gets support

To show this is not just a talking point, Yash referenced Krutrim, the Indian AI model built by Ola founder Bhavish Aggarwal's company, designed specifically for Indian languages and users (Source: Bloomberg, Entrepreneur India). "That's basically used by Indians, for Indians, by Indians," he said. "But to support Krutrim, you require lots of funding, lots of data centers, lots of physical infrastructure. And that is where the government has to support. Government is definitely doing at its own capacity, I'm not complaining in that sense."

His point is not that India lacks the ambition or ability to build its own AI stack. Krutrim is proof that it can be done. His point is that doing it at the scale China and the US operate at requires sustained investment in compute, data infrastructure, and the people who build on top of it, not a one off project.

## What this means for anyone building AI in India right now

For founders working on AI products inside India today, this gap cuts both ways. On one hand, the infrastructure and talent retention problems Yash describes are real constraints, access to compute, access to research talent willing to stay, and access to the kind of patient capital that deep AI work needs. On the other hand, a market that is still at stage four of adoption, rather than stage five, is a market with a lot of room left to build in. The companies that figure out how to work around India's current limitations, rather than waiting for them to be solved at a policy level, are the ones most likely to be standing in a strong position when the rest of the market catches up.

## What closing the gap actually requires

Yash's closing thought on this topic was simple. "If we start sustaining and retaining our talent, I think we will be able to remove that bottleneck, and we'll be able to compete with China and the US."

This is a useful reframe for anyone watching India's AI sector from the outside. The gap with China is not about India lacking smart people or good ideas. It is about what happens to those people once they are trained, whether they stay and build inside the country, or whether the best of them leave because the opportunities and the pay are better elsewhere. For founders and policymakers thinking about India's AI future, that is the problem worth solving first.

This conversation is part of Access Asia, a podcast series by ACCESS by ZiAn, the community initiative from ZiAn Ventures. If you are building in deep tech or enterprise AI in India and thinking about how to compete at a global scale, ZiAn Ventures works with technical founders to turn that ambition into a real venture.`
  },
  {
    id: 'art-6',
    title: "What Nobody Tells You About Returning to Work After Having a Child",
    slug: 'motherhood-and-career-in-tech',
    excerpt: "Koyelia Ghosh Roy, a Gen AI leader at Capgemini, on the hardest phase of her 20-year career, and what actually helps women return to work after having a child.",
    category: 'Future of Work',
    article_type: 'podcast',
    cover_image_url: '/blog-covers/podcast/motherhood-tech-career.jpg',
    status: 'published',
    is_featured: false,
    seo_title: "What Nobody Tells You About Returning to Work After Having a Child",
    meta_description: "Koyelia Ghosh Roy, a Gen AI leader at Capgemini, on the hardest phase of her 20-year career, and what actually helps women return to work after having a child.",
    target_keyword: 'returning to work after maternity break',
    guest_name: 'Koyelia Ghosh Roy (Gen AI and Agentic AI Leader at Capgemini)',
    reading_time: '4 min read',
    created_at: '2026-11-10T10:00:00.000Z',
    updated_at: '2026-11-10T10:00:00.000Z',
    content: `Of all the questions asked on the Access Asia podcast by ACCESS by ZiAn, one answer stood out for being the most personal. When Koyelia Ghosh Roy, Gen AI and Agentic AI leader at Capgemini, was asked about the hardest phase of her 20 year career, her answer had nothing to do with technology.

"The most challenging phase of my professional journey was when I had my daughter," she said. Not a product launch gone wrong, not a difficult migration, not a tough client. Becoming a mother, and figuring out how to keep working through it, was the hardest thing she has faced in two decades of a demanding career.

## Why this phase is harder than it looks from the outside

Koyelia describes motherhood as something that changes a person on more than one level. "Motherhood is a very different thing. You have a lot of changes that happen mentally, physiologically, and managing work along with a newborn baby gets tough. There is a lot of hard work that goes into balancing both."

This is a reality that rarely gets discussed openly in professional settings, especially in fast moving fields like data and AI, where the pace of change does not slow down for anyone. Koyelia was honest about how this timing collides with career pressure. "When a new mother rejoins the workforce, it is very difficult to manage both and also be at that competitive space, because the way things are moving is very fast."

This gap is backed by wider research too. A 2019 study by talent strategy firm Avtar found that a large share of Indian women who quit their careers midway cite maternity and the early challenges of motherhood as the main reason, alongside eldercare responsibilities (Source: Deccan Herald). Separately, LinkedIn's Opportunity Index from 2021 found that a majority of working women in India said family care responsibilities get in the way of their career growth (Source: Deccan Herald). Koyelia's experience is not an isolated one. It reflects something many women in tech go through quietly, often without saying so at work.

## It takes a village, and that is not a cliche

Asked what advice she would give someone in the same position, Koyelia did not offer a simple productivity hack. She pointed to something more structural, the support system around a working mother.

"It takes a village to support a woman, and a man also. Traditionally, when a man used to go to work, the entire household used to be managed by the wife, by others, in the house. But when a woman also goes out, there is no one to take care. So it takes a very strong support system around you, for your needs and for your kids, people whom you can trust, so that you can concentrate on your career."

This is a point worth sitting with. Much of the advice given to working mothers focuses on individual time management or personal resilience. Koyelia's framing shifts the focus to something more honest, that no one manages a demanding career and a newborn alone, and pretending otherwise puts unfair pressure on the individual instead of the system around them.

## Permission to slow down

Perhaps the most important part of her answer was permission, something many working mothers rarely give themselves. Koyelia was direct about this. "If you are not ready physiologically, if you are not able to do it, take a step back. Heal yourself, and then come back at a much better speed."

This is a hard thing to say out loud in competitive industries like AI and data, where the pace rarely slows down and taking a break can feel like falling behind. But Koyelia's own career is proof that a pause does not mean an end. She went on to lead enterprise wide BI and AI initiatives, build some of the earliest agentic AI products inside her organisation, and earn recognition as an AI Maker 100 in 2025 and a Top 20 Future of Work Icon. Her path was not a straight line, and it did not need to be.

## What this means for workplaces, not just individuals

Koyelia's story is a personal one, but the pattern behind it is systemic. Industry data shows that a meaningful share of skilled women step back from their careers around motherhood, and many take years to return, if they return at all (Source: Deccan Herald). The companies and teams that actively build support systems, flexible return paths, and realistic expectations for new mothers are the ones that keep experienced talent instead of quietly losing it.

For an industry like AI, where context and judgement built over years matter as much as technical skill, losing experienced professionals to an unsupported return to work is not just a personal loss. It is a loss of exactly the kind of hands on expertise that takes years to rebuild.

This is also why dedicated returnee programs have started showing up across the tech industry in India. Companies such as Amazon, Myntra, Google, and Thoughtworks have built structured second innings programs aimed specifically at women coming back after a career break, often pairing returnees with mentors and flexible onboarding paths (Source: Free Press Journal). Programs like these exist precisely because Koyelia's experience is common enough to need a system, not just individual willpower, to fix it.

If you are a working mother in tech right now, Koyelia's advice is worth holding on to. Build your support system before you need it. Give yourself permission to pause if your body and mind are asking for it. And trust that returning at your own pace does not erase the years of expertise you already carry with you.

This conversation is part of Access Asia, a podcast series by ACCESS by ZiAn, the community initiative from ZiAn Ventures.`
  },
  {
    id: 'art-7',
    title: "Vibe Coding Explained: Where It Helps and Where It Breaks",
    slug: 'vibe-coding-explained',
    excerpt: "What is vibe coding, and when should you actually use it? Capgemini's Koyelia Ghosh Roy breaks down where it helps and where it fails at enterprise scale.",
    category: 'Engineering & GenAI',
    article_type: 'podcast',
    cover_image_url: '/blog-covers/podcast/vibe-coding.jpg',
    status: 'published',
    is_featured: false,
    seo_title: "Vibe Coding Explained: Where It Helps and Where It Breaks",
    meta_description: "What is vibe coding, and when should you actually use it? Capgemini's Koyelia Ghosh Roy breaks down where it helps and where it fails at enterprise scale.",
    target_keyword: 'vibe coding',
    guest_name: 'Koyelia Ghosh Roy (Gen AI and Agentic AI Leader at Capgemini)',
    reading_time: '4 min read',
    created_at: '2026-11-10T10:00:00.000Z',
    updated_at: '2026-11-10T10:00:00.000Z',
    content: `If you have spent any time online in the last year, you have probably come across the term vibe coding. It was first used by Andrej Karpathy, former OpenAI researcher, in a post on social media in February 2025, where he described a new way of building software by fully giving in to the vibes and letting AI handle the code (Source: dev.to). The term caught on fast. By the end of 2025, it was named Collins Dictionary's Word of the Year (Source: scrimba.com).

On the Access Asia podcast by ACCESS by ZiAn, Koyelia Ghosh Roy, Gen AI and Agentic AI leader at Capgemini, shared a grounded, practical view of vibe coding that goes beyond the hype. Her take is useful for anyone deciding whether to use it for their next project, whether that is a weekend prototype or a product meant for thousands of users.

## What vibe coding actually is

In simple terms, vibe coding means describing what you want to build in plain language and letting an AI tool generate the code for you. You are not writing syntax line by line. You are directing the outcome and reviewing what comes out.

Koyelia sees real value in this. "It is really good because it is furthermore democratising the entire AI ecosystem. It is not restricted to only people who understand or build on AI. Now even a person who has a thought can build it with AI."

This matches what most of the industry has observed since vibe coding took off. It has removed a major barrier for non technical founders who previously needed to hire a developer or learn to code before they could test an idea.

## Where vibe coding genuinely shines

Koyelia was clear that vibe coding has a real and valuable place, especially early in a product's life. "Vibe coding is good for a small scope, for limited usage, and also to develop your MVP product. If you want to create a product and present that idea to someone, vibe coding is the best way to go, because it does not take any effort. One person can sit and do the entire product."

This is especially useful for founders who need to validate an idea quickly or pitch to investors before investing in a full engineering team. Once the idea is proven and the direction is clear, the code can then be handed over to experienced engineers who can enhance and rebuild it properly for scale.

## Where it starts to break down

The same qualities that make vibe coding fast also make it risky once real users and real money are involved. Koyelia pointed to two specific problems.

The first is security. "The only problem with vibe coding is that it does not always have the best security protocol." Because the AI is generating code quickly based on prompts, it can miss basic safeguards that an experienced engineer would normally catch.

The second is technical debt, which she described as unnecessary code building up in the background. "There is a lot of what we call technical debt. Unnecessary code is there which really makes it very heavy. So when you actually run that in production, you come across security problems, maintenance problems, and latency issues."

This observation lines up with what security researchers have found more broadly. Reports on AI generated code have documented real risks tied to skipped code review and accumulated technical debt once vibe coded projects move into production (Source: Checkmarx, checkmarx.com).

## The enterprise test

Koyelia's bottom line is straightforward. Vibe coding is excellent for small, well defined scopes and for getting an idea off the ground fast. It is not something to rely on for enterprise grade systems.

"If you are talking about enterprise grade solutions, then one has to be very careful when they build a solution just by using vibe coding." At that scale, the stakes are different. A security gap or a performance issue does not just slow down a demo, it can affect real customers and real revenue.

## How to think about it practically

If you are a founder or a team lead deciding how to use vibe coding, a simple filter works well. Ask whether the project is meant to prove an idea or run a business.

For proving an idea, pitching a concept, or building something only a handful of people will use, vibe coding can save weeks of work and a large chunk of your budget. For anything customer facing, anything handling sensitive data, or anything expected to scale, treat the vibe coded version as a starting draft, not the final product. Bring in engineers who understand security, performance, and the operating environment it needs to run in before it goes live.

This is also closely tied to a related question Koyelia raised in the same conversation, whether mid career professionals should aim to be generalists or subject matter experts. Her view was that being a subject matter expert in a field that still holds value is extremely important, because that expertise is what trains an AI system to make good decisions in the first place. Vibe coding can help a generalist sketch an idea fast, but it is the subject matter expert who knows whether that idea will actually work in the real world.

Used this way, vibe coding is not a shortcut around good engineering. It is a faster way to find out what is worth engineering properly.

This conversation is part of Access Asia, a podcast series by ACCESS by ZiAn, the community initiative from ZiAn Ventures. If you have built an MVP with vibe coding and are now ready to turn it into a real, enterprise ready product, ZiAn Ventures works with technical founders to make that transition.`
  },
  {
    id: 'art-8',
    title: "AI Has Become the New Corporate Horoscope: Why Most Companies Fail With AI",
    slug: 'why-companies-fail-with-ai',
    excerpt: "Yash Sanghavi, founder of Yanisa Execution, on why most companies fail with AI, and the two types of people shaping how businesses actually adopt it.",
    category: 'Enterprise AI',
    article_type: 'podcast',
    cover_image_url: '/blog-covers/podcast/why-companies-fail-ai.jpg',
    status: 'published',
    is_featured: false,
    seo_title: "AI Has Become the New Corporate Horoscope: Why Most Companies Fail With AI",
    meta_description: "Yash Sanghavi, founder of Yanisa Execution, on why most companies fail with AI, and the two types of people shaping how businesses actually adopt it.",
    target_keyword: 'why companies fail at AI adoption',
    guest_name: 'Yash Sanghavi (Founder of Yanisa Execution)',
    reading_time: '4 min read',
    created_at: '2026-11-10T10:00:00.000Z',
    updated_at: '2026-11-10T10:00:00.000Z',
    content: `Near the end of his conversation on the Access Asia podcast by ACCESS by ZiAn, Yash Sanghavi, founder of Yanisa Execution, read out something he had written earlier, originally addressed to the CEO of a company with over fifteen thousand employees. It is one of the sharpest breakdowns of why AI adoption fails inside real organisations, and it is worth hearing in his own words.

## Two types of people in the market

Yash's note opens with a distinction he says shapes almost every AI conversation he has with founders and executives. "There are currently two types of people in the market. People who understand AI, and people who think they understand AI. The funny part, the second group is much larger."

He described what that second group sounds like in a meeting. "Every day I meet founders, CXOs, consultants, and professionals who casually drop words like agents, automations, MCP, multimodal, AI first, autonomous systems. Vocabulary is impressive. The execution is missing."

He went further, describing specific patterns he runs into constantly. "Some people have twenty years of experience and believe experience alone will protect them from the change. Some people attend one AI webinar and suddenly become an AI strategist. Some people want AI to replace their entire company by next Friday. And some genuinely believe AI is a magical employee that never makes mistakes, never needs context, and somehow reads minds."

## The conversation that exposes the gap

Yash shared the exact exchange that, in his experience, reveals whether a company is actually ready to use AI. "My favourite conversation usually goes like this. We want an AI agent. I say great. Then I ask questions. What processes are you trying to automate? We haven't defined the process yet. What data does it need? We'll figure that out later. Without data, we are building AI systems. What outcome are you optimising for? Everything."

His conclusion from these conversations is blunt. "AI has become the new corporate horoscope. Everyone believes in it. Very few understand how it actually works."

This is not an abstract complaint. Earlier in the conversation, Yash explained what real enterprise AI work actually looks like from the inside, and it is slower and more deliberate than most leadership teams expect. "That takes time, that takes six to eight months of a lot of back and forth, a lot of brainstorming, where to apply, how to apply." The goal, he said, is usually to bring a company's operating cost down to a tenth of what it was while increasing revenue by at least two times, but only after the groundwork of defining processes and collecting data is actually done.

## What AI is not

Yash's written note is equally direct about what AI cannot do for a business that has not done its own homework first. "AI is not magic. AI is not a replacement of thinking. AI is not a substitute for process design. And AI is definitely not going to fix a broken business model. If your data is poor, AI will help you make poor decisions at scale. If your expectations are unrealistic, AI will disappoint you with remarkable efficiency."

This single idea, that AI amplifies whatever is already true about a business, good or bad, is the clearest explanation he offers for why so many AI initiatives quietly fail inside large organisations. The technology is rarely the actual problem.

## Advice for working professionals who feel threatened

Yash also addressed the anxiety he sees in employees who worry AI will replace them outright. His advice runs counter to the instinct to hide or resist the change. "If they want to really skill themselves, then whatever work they're doing, try to automate it, and go to your boss and say, I automated my own work. That means I'm so talented that I can automate my own work. The employer will not remove you. The employer will give you a better job description, a decision making role, because you automated your own work, it means you're saving money for me now."

For organisations that are hesitant to change, he offered a separate analogy for how he handles this directly with clients. "We don't touch the current train. We create a co-train. The day my train beats yours, you'll identify the effort you put in building your train, the money, the people, the time, is going to be lost for your train. So that is where the mindset for working professionals also should change."

## The line that sums it up

Yash closed his written note with the line he considers the core of the entire conversation. "The companies winning with AI today are not the ones using the fanciest word. They are the ones willing to question old assumptions, redesign workflows, learn continuously, and adapt faster than everyone else. The future won't belong to people who talk about AI. It will belong to people who understand where human intelligence ends and artificial intelligence begins. Most people are still figuring out which side of that line they are standing on."

For any business leader currently deciding whether to greenlight an AI initiative, Yash's framing offers a useful filter before the project even starts. If you cannot clearly answer what process you are automating, what data it needs, and what outcome you are optimising for, you are not ready to build an AI agent yet, no matter how fluent your team sounds in the vocabulary.

This conversation is part of Access Asia, a podcast series by ACCESS by ZiAn, the community initiative from ZiAn Ventures. If your organisation is trying to move past the vocabulary stage and actually build AI into how you operate, ZiAn Ventures works with enterprise teams and technical founders to do exactly that.`
  }
];

export const ALL_INITIAL_ARTICLES: Article[] = [...INITIAL_ARTICLES, ...INITIAL_MEETING_NOTES];
