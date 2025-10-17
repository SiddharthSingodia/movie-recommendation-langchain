// import Link from 'next/link';

// interface ForumTopic {
//   category: string;
//   title: string;
//   replies: number;
//   colorClass: string;
// }

// const forumTopicsData: ForumTopic[] = [
//   {
//     category: 'Tips & Tricks',
//     title: 'Best travel hacks for solo travelers',
//     replies: 23,
//     colorClass: 'bg-chart-1/10 text-chart-1',
//   },
//   {
//     category: 'Destinations',
//     title: 'How to plan a budget-friendly trip to Leh',
//     replies: 15,
//     colorClass: 'bg-chart-2/10 text-chart-2',
//   },
//   {
//     category: 'Hidden Gems',
//     title: 'Top 5 underrated places in South India',
//     replies: 9,
//     colorClass: 'bg-purple-600/10 text-purple-400',
//   },
// ];

// const CommunityForum = () => {
//   return (
//     <section className="py-16 sm:py-20 lg:py-24">
//       <div className="container mx-auto px-4">
//         <div className="mx-auto max-w-3xl text-center">
//           <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
//             Join the Conversation
//           </h2>
//           <p className="mt-4 text-lg text-text-secondary">
//             Connect with fellow travelers, ask questions, and share your experiences in our buzzing travel community!
//           </p>
//         </div>

//         <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {forumTopicsData.map((topic, index) => (
//             <Link href="#" key={index} className="group block">
//               <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
//                 <span
//                   className={`mb-4 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold ${topic.colorClass}`}
//                 >
//                   {topic.category}
//                 </span>
//                 <h3 className="flex-grow text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
//                   {topic.title}
//                 </h3>
//                 <p className="mt-2 text-sm text-text-muted">{topic.replies} replies</p>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <div className="mt-16 text-center">
//           <Link
//             href="#"
//             className="inline-block rounded-full bg-gradient-to-r from-pink-primary via-primary to-purple-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 ring-2 ring-transparent ring-offset-2 ring-offset-navy-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40 focus:outline-none focus:ring-primary"
//           >
//             Visit Forum
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CommunityForum;

import Link from "next/link";

interface ForumTopic {
  category: string;
  title: string;
  replies: number;
  colorClass: string;
}

const forumTopicsData: ForumTopic[] = [
  {
    category: "AI Insights",
    title: "How GenAI understands your mood for movie recommendations",
    replies: 54,
    colorClass: "bg-blue-500/10 text-blue-400",
  },
  {
    category: "Feature Requests",
    title: "Suggest new genres or mood types to improve recommendations",
    replies: 31,
    colorClass: "bg-green-500/10 text-green-400",
  },
  {
    category: "User Discussions",
    title: "Share your favorite AI-suggested movies and how accurate they felt!",
    replies: 68,
    colorClass: "bg-purple-500/10 text-purple-400",
  },
  {
    category: "Feedback",
    title: "Facing issues with movie recommendations? Let’s fix it together.",
    replies: 17,
    colorClass: "bg-pink-500/10 text-pink-400",
  },
  {
    category: "Behind the Scenes",
    title: "How LangChain and TMDB API power the movie recommender system",
    replies: 25,
    colorClass: "bg-orange-500/10 text-orange-400",
  },
];

const CommunityForum = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Join the Movie Community
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Discuss, share, and explore how AI can better understand your mood and recommend the perfect movies for you!
          </p>
        </div>

        {/* ✅ Horizontal Scroll Section */}
        <div className="mt-12 overflow-x-auto no-scrollbar">
          <div className="flex space-x-6">
            {forumTopicsData.map((topic, index) => (
              <Link href="#" key={index} className="group min-w-[300px] max-w-[320px] flex-shrink-0">
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
                  <span
                    className={`mb-4 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold ${topic.colorClass}`}
                  >
                    {topic.category}
                  </span>
                  <h3 className="flex-grow text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">{topic.replies} replies</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="#"
            className="inline-block rounded-full bg-gradient-to-r from-pink-primary via-primary to-purple-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 ring-2 ring-transparent ring-offset-2 ring-offset-navy-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40 focus:outline-none focus:ring-primary"
          >
            Visit Movie Forum
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunityForum;
