import { faker } from "@faker-js/faker";
import iconLogo from "../images/iconLogo.png";
import Logo from "../images/logo.png";

// ----------------------------------------------------------------------

const posts = [
  {
    id: 1,
    cover: Logo,
    title: "Whiteboard Templates By Industry Leaders",
    createdAt: faker.date.past(),
    view: 4,
    comment: 5,
    share: 3,
    favorite: 1,
    author: {
      name: "PropTech Inc",
      avatarUrl: iconLogo,
    },
  },
  {
    id: 2,
    cover: Logo,
    title: "Brokers ok",
    createdAt: faker.date.past(),
    view: 30,
    comment: 10,
    share: 15,
    favorite: 3,
    author: {
      name: "PropTech Inc",
      avatarUrl: iconLogo,
    },
  },
  {
    id: 3,
    cover: Logo,
    title: "Casa Grande",
    createdAt: faker.date.past(),
    view: 10,
    comment: 4,
    share: 10,
    favorite: 5,
    author: {
      name: "PropTech Inc",
      avatarUrl: iconLogo,
    },
  },
  {
    id: 4,
    cover: Logo,
    title: "Muy buena atencion en PropTech",
    createdAt: faker.date.past(),
    view: 45,
    comment: 30,
    share: 25,
    favorite: 22,
    author: {
      name: "PropTech Inc",
      avatarUrl: iconLogo,
    },
  },
];

export default posts;
