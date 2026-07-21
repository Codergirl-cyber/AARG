export interface TeamMember {
  name: string;
  role: string;
  subteam: Subteam;
  photoUrl?: string;
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
    photoUrl?: string;
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
    },
  ],

  faculty: [
    {
      name: "Dr Pradeep Mane",
      role: "Principal",
      subteam: "Faculty Advisor",
      linkedinUrl: "https://www.linkedin.com/in/dr-pradeep-mane/",
      photoUrl: "/images/team/Pradeep%20Mane.png",
    },
    {
      name: "Mr Rahul Jadhav",
      role: "Faculty Coordinator",
      subteam: "Faculty Advisor",
      linkedinUrl: "https://www.linkedin.com/in/rahul-jadhav-9571641b3/",
      photoUrl: "/images/team/Rahul%20Jadhav.png",
    },
    {
      name: "Mr Ganesh Wani",
      role: "Faculty Coordinator",
      subteam: "Faculty Advisor",
      linkedinUrl: "",
      photoUrl: "/images/team/Ganesh%20Wani.png",
    },
  ],

  leads: [
    {
      name: "Hitesh Patil",
      role: "NIDAR 2027 Lead",
      subteam: "Leadership",
      linkedinUrl: "https://www.linkedin.com/in/hitesh-patil07/",
      photoUrl: "/images/team/Hitesh%20Patil.png",
    },
    {
      name: "Shreyas Karade",
      role: "Aerodynamics Lead",
      subteam: "Leadership",
      photoUrl: "/images/team/Shreyas%20Kharade.png",
      linkedinUrl: "https://www.linkedin.com/in/shreyas-karade-273a42194/",
    },
    {
      name: "Siddesh Kavitkar",
      role: "Avionics and Core Firmware Lead",
      subteam: "Leadership",
      linkedinUrl: "https://www.linkedin.com/in/siddhesh-kavitkar-1a3469339/",
      photoUrl: "/images/team/siddhesh%20Kavitkar.jpg",
    },
    {
      name: "Somshekhar Hunasimarad",
      role: "Structures and Fabrication Lead",
      subteam: "Leadership",
      linkedinUrl: "https://www.linkedin.com/in/somshekhar-hunasimarad/",
      photoUrl: "/images/team/Someshkhar%20Hunasimarad.jpg",
    },
  ],

  members: {
    Members: [
      {
        name: "Pushkar Lokhande",
        role: "Member",
        subteam: "Members",
        linkedinUrl: "https://www.linkedin.com/in/pushkar-lokhande-246b11311/",
        photoUrl: "/images/team/pushkar%20lokhande.png",
      },
      {
        name: "Karan Tikoo",
        role: "Member",
        subteam: "Members",
        linkedinUrl: "https://www.linkedin.com/in/karan-tikoo-2a1755232/",
        photoUrl: "/images/team/Karan%20Tikoo.png",
      },
      {
        name: "Vishwank Ramji",
        role: "Member",
        subteam: "Members",
        linkedinUrl: "https://www.linkedin.com/in/vishwank-ramji-6031a0359/",
        photoUrl: "/images/team/Vishwank%20Ramji.jfif",
      },
      {
        name: "Harshvardhan Karkera",
        role: "Member",
        subteam: "Members",
        linkedinUrl: "https://www.linkedin.com/in/harshvardhan-karkera-70479b386/",
        photoUrl: "/images/team/harsh.png",
      },
      {
        name: "Sarthak Chikte",
        role: "Member",
        subteam: "Members",
        linkedinUrl: "https://www.linkedin.com/in/sarthak-chikte-ba8780291/",
        photoUrl: "/images/team/sarthak%20c.png",
      },
      {
        name: "Sharal Vishvakarma",
        role: "Member",
        subteam: "Members",
        linkedinUrl: "https://www.linkedin.com/in/sharal-vishvkarma-b194792bb/",
        photoUrl: "/images/team/sharal.png",
      },
      {
        name: "Shravani Chidrawar",
        role: "Member",
        subteam: "Members",
        linkedinUrl: "https://www.linkedin.com/in/shravani-chidrawar-42a68a343",
        photoUrl: "/images/team/shravani.png",
      },
      {
        name: "Aaron Mobby",
        role: "Member",
        subteam: "Members",
        linkedinUrl: "https://www.linkedin.com/in/aaron-mobby-5819a0289/",
        photoUrl: "/images/team/aaron%20mobby.png",
      },
      {
        name: "Nandini Gheware",
        role: "Member",
        subteam: "Members",
        linkedinUrl: "https://www.linkedin.com/in/nandini-gheware-287400386/",
        photoUrl: "/images/team/nandini%20gheware.png",
      },
      {
        name: "Namit Solanki",
        role: "Member",
        subteam: "Members",
        linkedinUrl: "https://www.linkedin.com/in/namit-solanki/",
        photoUrl: "/images/team/Namit Solanki.png",
      },
      {
        name: "Ayush Sharma",
        role: "Alumni",
        subteam: "Members",
        linkedinUrl: "https://www.linkedin.com/in/ayusharma-23aip/",
        photoUrl: "/images/team/ayush%20sharma.png",
      },
    ],
  },

  alumni: [],
};