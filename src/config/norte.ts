export const norteConfig = {
  whatsappNumber: "15551943682", // Meta Test Number
  whatsappDisplay: "+1 (555) 194-3682",
  whatsappDefaultMessage: "help",
  title: "Pal Norte Buddy Bot",
  description: "Your text-based utility assistant for the festival.",
  commands: [
    {
      cmd: "help",
      desc: "See all commands and how to use the bot.",
      example: "Just text 'help'"
    },
    {
      cmd: "benefits",
      desc: "Check VIP area perks and exact locations.",
      example: "Text 'benefits' to see where to find the VIP bathrooms."
    },
    {
      cmd: "status",
      desc: "Check your group's latest meetup point and fallback plan.",
      example: "Text 'status' to know where to go."
    },
    {
      cmd: "lost",
      desc: "Get an immediate reply with instructions if you lose your group.",
      example: "Text 'lost' when you need help."
    }
  ],
  faqs: [
    {
      q: "Do I need to download an app?",
      a: "No, it works entirely through WhatsApp text messages. No heavy apps to drain your battery."
    },
    {
      q: "What happens when the signal is bad?",
      a: "WhatsApp is optimized for low-bandwidth. Text messages will go through as soon as you have a sliver of signal, unlike heavy web pages."
    }
  ],
  disclaimer: "Information is curated by admins. Official festival rules and schedules are subject to change without notice here."
};
