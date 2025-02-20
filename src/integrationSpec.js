const url = "https://zd560pz9-7890.uks1.devtunnels.ms";

// export const integrationSpecSettings = {
//   data: {
//     date: {
//       created_at: "2025-02-19",
//       updated_at: "2025-02-19",
//     },
//     descriptions: {
//       app_description:
//         "Responds to messages with relevant GIFs based on keywords.",
//       app_logo: "https://iili.io/2yD2sqJ.png.",
//       app_name: "Gif Responder.",
//       app_url: url,
//       background_color: "#222222",
//     },
//     integration_category: "Email & Messaging",
//     integration_type: "modifier",
//     is_active: true,
//     output: [],
//     key_features: [
//       "Detects specific keywords in messages.",
//       "Retrieves relevant GIFs from the Giphy API based on detected keywords.",
//       "Sends the GIF link as a response in the channel.",
//       "Allows users to define custom keyword-GIF mappings.",
//       "Limits the number of GIF responses per minute to prevent spam.",
//     ],
//     permissions: {
//       monitoring_user: {
//         always_online: true,
//         display_name: "Performance Monitor",
//       },
//     },
//     settings: [
//       {
//         label: "Giphy API Key",
//         default: process.env.GIPHY_API_KEY,
//         type: "text",
//         required: true,
//         description: "Api key from giphy",
//       },
//       {
//         label: "Custom Keywords",
//         default:
//           "happy, say, playing, working, busy, tired, serious, dead, shoot, danger, difficult, funny, party, excited, awkward, livid, angry, ",
//         type: "text",
//         required: false,
//         description:
//           "Define custom keywords and their mapped search terms for GIFs. Example: happy=celebration,sad=crying",
//       },
//       {
//         label: "Max Responses Per Minute",
//         description: "Rate limiting to avoid spam",
//         type: "number",
//         required: false,
//         default: 5,
//       },
//     ],
//     endpoints: {
//       process_message: {
//         url: `${url}/process-message`,
//         method: "POST",
//       },
//     },
//     target_url: `${url}/webhook.`,
//   },
// };

export const integrationSpecSettings = {
  data: {
    date: {
      created_at: "2025-02-20",
      updated_at: "2025-02-20",
    },
    descriptions: {
      app_name: "Gif Responder",
      app_description:
        "Responds to messages with relevant GIFs based on keywords",
      app_logo: "https://iili.io/2yD2sqJ.png",
      app_url: url,
      background_color: "#fff",
    },
    is_active: true,
    integration_type: "modifier",
    integration_category: "Email & Messaging",
    key_features: [
      'Detects specific keywords in messages."',
      "Retrieves relevant GIFs from the Giphy API based on detected keywords.",
      "Sends the GIF link as a response in the channel.",
      "Allows users to define custom keyword-GIF mappings.",
      "Limits the number of GIF responses per minute to prevent spam.",
    ],
    author: "Ebube Nwanze",
    settings: [
      {
        label: "Max Responses Per Minute",
        type: "number",
        required: true,
        default: "5",
      },
      {
        label: "Giphy Api Key",
        type: "text",
        required: true,
        default: "Wv4ZDjgpiRVEgW0N7g2xUqXKBclzWFmj",
      },
      {
        label: "Custom Keywords",
        type: "multi-select",
        required: true,
        default:
          "happy, sad, playing, working, busy, tired, serious, dead, shoot, danger, difficult, funny, party, excited, awkward, livid, angry, thrilled, annoyed, anxious, brave, cheerful, clumsy, curious, defeated, determined, eager, energetic, fierce, frustrated, gentle, grateful, guilty, hopeful, helpless, hesitant, humble, hilarious, impatient, insecure, intelligent, jealous, joyful, lonely, lucky, mysterious, nervous, obedient, optimistic, outraged, peaceful, perplexed, powerful, proud, puzzled, relaxed, relieved, restless, romantic, ruthless, scared, selfish, serious, shocked, shy, silly, sleepy, sly, smug, sneaky, sorrowful, spiteful, stressed, strong, stubborn, successful, surprised, suspicious, thoughtful, tired, uncertain, uncomfortable, uneasy, unmotivated, unpredictable, victorious, weak, weary, worried",
      },
    ],
    target_url: `${url}/webhook`,
  },
};
