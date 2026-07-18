export interface TeamMember {
  name: string;
  role: string;
  subteam: Subteam;
  photoUrl?: string; // Optional: if missing, initials-avatar is generated
  linkedinUrl?: string;
}

export type Subteam = 
  | "Leadership"
  | "Faculty Advisor"
  | "Aerodynamics & Design"
  | "Structures & Fabrication"
  | "Avionics & Controls"
  | "Manufacturing & Propulsion"
  | "Business & Sponsorship"
  | "Alumni"
  | "Members";

export interface TeamData {
  leadership: TeamMember[];
  faculty: TeamMember[];
  leads: TeamMember[];
  members: Record<string, TeamMember[]>;
  alumni: {
    name: string;
    role: string;
    classYear: string;
    linkedinUrl?: string;
  }[];
}
export const teamData: TeamData = {
  leadership: [
    {
      name: "Aryan Basnet",
      role: "Team Captain / President",
      subteam: "Leadership",
      linkedinUrl: "https://www.linkedin.com/in/aryan-basnet-446973235/",
      photoUrl: "/images/team/aryan%20basnet.png",
    },
    {
      name: "[SYSTEMS ENGINEER NAME]",
      role: "Vice-Captain / Systems Engineer",
      subteam: "Leadership",
      linkedinUrl: "https://linkedin.com/in/[SYSTEMS_LINKEDIN]",
    }
  ],
  faculty: [
    {
      name: "Mr Rahul Jadhav",
      role: "Faculty Advisor",
      subteam: "Faculty Advisor",
      linkedinUrl: "https://www.linkedin.com/in/rahul-jadhav-9571641b3/",
      photoUrl: "/images/team/Rahul%20Jadhav.png",
    }
  ],
  leads: [],
  members: {
    "Members": [
      { name: "Hitesh Patil", role: "Current NIDAR 2027 Lead", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/hitesh-patil07/" },
      { name: "Shreyas Kharade", role: "Aerodynamics Lead", subteam: "Members" },
      { name: "Siddesh Kavitkar", role: "Avionics and Core Firmware Lead", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/siddhesh-kavitkar-1a3469339/", photoUrl: "/images/team/siddhesh%20Kavitkar.jpg" },
      { name: "Somshekhar Hunasimarad", role: "Structures and Fabrication Lead", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/somshekhar-hunasimarad/", photoUrl: "/images/team/Someshkhar%20Hunasimarad.jpg" },
      { name: "Pushkar Lokhande", role: "Member", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/pushkar-lokhande-246b11311/" },
      { name: "Karan Tikoo", role: "Member", subteam: "Members", photoUrl: "/images/team/Karan%20Tikoo.png" },
      { name: "Vishwank Ramji", role: "Member", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/vishwank-ramji-6031a0359/" },
      { name: "Harshvardhan Karkera", role: "Member", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/harshvardhan-karkera-70479b386/" },
      { name: "Sarthak Chikte", role: "Member", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/sarthak-chikte-ba8780291/", photoUrl: "/images/team/Sarthak%20Chikte.jpg" },
      { name: "Sharal Vishvakarma", role: "Member", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/sharal-vishvkarma-b194792bb/" },
      { name: "Shravani Chidrawar", role: "Member", subteam: "Members" },
      { name: "Aaron Mobby", role: "Member", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/aaron-mobby-5819a0289/", photoUrl: "/images/team/Aaron%20Mobby.png" },
      { name: "Nandini Gheware", role: "Member", subteam: "Members", linkedinUrl: "https://www.linkedin.com/in/nandini-gheware-287400386/", photoUrl: "/images/team/nandini%20gheware.png" }
    ]
  },
  alumni: [
    {
      name: "[ALUMNI NAME 1]",
      role: "Former Team Captain",
      classYear: "Class of 2025",
      linkedinUrl: "https://linkedin.com/in/[ALUMNI_1_LINKEDIN]",
    },
    {
      name: "[ALUMNI NAME 2]",
      role: "Former Avionics Lead",
      classYear: "Class of 2024",
      linkedinUrl: "https://linkedin.com/in/[ALUMNI_2_LINKEDIN]",
    },
    {
      name: "[ALUMNI NAME 3]",
      role: "Former Aerodynamics Lead",
      classYear: "Class of 2023",
      linkedinUrl: "https://linkedin.com/in/[ALUMNI_3_LINKEDIN]",
    }
    ,
    {
      name: "Ayush Sharma",
      role: "Alumni",
      classYear: "Alumni",
    }
  ]
};
