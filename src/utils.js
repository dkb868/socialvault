// mapping of fb folder names to human readable display names
const categories = [
  {
    name: "profile_information",
    display_name: "Profile Information",
    enabled: true,
    icon: "user",
    color: "blue",
    description:
      "Basic profile information including previous names, emails and phone numbers, family members, education history and work history",
  },
  {
    name: "photos_and_videos",
    display_name: "Photos", // TODO Change to Photos and Videos when video support added
    enabled: true,
    icon: "camera",
    color: "teal",
    description: "Photos you've uploaded to Facebook",
  },
  {
    name: "messages",
    display_name: "Messages",
    enabled: true,
    icon: "map marker alternate",
    color: "red",
    description: "An analysis of all the messages you have sent",
  },
  {
    name: "posts",
    display_name: "Posts",
    enabled: true,
    icon: "newspaper",
    color: "green",
    description:
      "Posts you've shared on Facebook and posts others have made on your timeline, as well as notes you've created",
  },
  {
    name: "ads",
    display_name: "Advertising",
    enabled: false,
    icon: "briefcase",
    color: "teal",
  },
  {
    name: "apps_and_websites",
    display_name: "Apps and Websites",
    enabled: false,
  },
  {
    name: "calls_and_messages",
    display_name: "Calls and Messages",
    enabled: false,
  },
  {
    name: "comments",
    display_name: "Comments",
    enabled: true,
    icon: "comments",
    color: "orange",
    description:
      "Comments you've posted on your own posts, on other people's posts, or in groups you belong to",
  },
  {
    name: "events",
    display_name: "Events",
    enabled: true,
    icon: "calendar",
    color: "green",
    description:
      "Your responses to events and a list of the events you've created",
  },
  {
    name: "following_and_followers",
    display_name: "Following and Followers",
    enabled: true,
    icon: "calendar check",
    color: "yellow",
    description: "People you follow, and pages that you've unfollowed",
  },
  {
    name: "friends",
    display_name: "Friends",
    enabled: true,
    icon: "user plus",
    color: "olive",
    description:
      "A list of all your friends, and the date that you became friends",
  },
  {
    name: "groups",
    display_name: "Groups",
    enabled: true,
    icon: "users",
    color: "purple",
    description: "A list of groups you've created, and groups you've joined",
  },
  {
    name: "likes_and_reactions",
    display_name: "Likes and Reactions",
    enabled: true,
    icon: "thumbs up",
    color: "violet",
    description: "Posts, comments and Pages you've liked or reacted to",
  },
  {
    name: "location",
    display_name: "Location",
    enabled: false,
  },
  {
    name: "marketplace",
    display_name: "Marketplace",
    enabled: false,
  },
  {
    name: "messages",
    display_name: "Messages",
    enabled: false,
  },
  {
    name: "other_activity",
    display_name: "Other Activity",
    enabled: false,
  },
  {
    name: "pages",
    display_name: "Pages",
    enabled: true,
    icon: "flag",
    color: "pink",
    description: "Pages that you are an admin of",
  },
  {
    name: "payment_history",
    display_name: "Payment History",
    enabled: false,
  },

  {
    name: "about_you",
    display_name: "About You",
    enabled: true,
    icon: "user secret",
    color: "orange",
    description: "Information associated with your Facebook account",
  },
  {
    name: "saved_items_and_collections",
    display_name: "Saved Items and Collections",
    enabled: false,
    icon: "shopping bag",
    color: "green",
  },
  {
    name: "search_history",
    display_name: "Search History",
    enabled: true,
    icon: "search",
    color: "yellow",
    description:
      "A history of the words, phrases and names you've searched for",
  },
  {
    name: "security_and_login_information",
    display_name: "Security and Login Information",
    enabled: false,
    icon: "lock",
    color: "olive",
  },
  {
    name: "stories",
    display_name: "Stories",
    enabled: false,
  },
  {
    name: "your_places",
    display_name: "Your Places",
    enabled: false,
    icon: "map marker alternate",
    color: "purple",
  },
];

export function getCategories() {
  return categories.filter((category) => category.enabled);
}
