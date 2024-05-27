// const products = [
//   {
//     id: "1",
//     name: "Salmon Fillet | 200g - 250g",
//     price: "$10",
//     description:
//       "Beef Sirloin is one of the two major subprimals of the beef loin primal cut, which runs from the 13th rib to the end of the hip bone.",
//     image:
//       "https://static.wixstatic.com/media/02eae1_3f710666448249bd90d80b97cc7b47a5~mv2.jpg/v1/fill/w_316,h_236,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/02eae1_3f710666448249bd90d80b97cc7b47a5~mv2.jpg",
//   },
//   {
//     id: "2",
//     name: "Tenggiri Steak | 200g - 250g",
//     price: "$20",
//     description:
//       "Beef Sirloin is one of the two major subprimals of the beef loin primal cut, which runs from the 13th rib to the end of the hip bone.",
//     image:
//       "https://static.wixstatic.com/media/02eae1_01040b4ef0c040ebad8da815c6cc1ec2~mv2.jpg/v1/fill/w_316,h_236,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/02eae1_01040b4ef0c040ebad8da815c6cc1ec2~mv2.jpg",
//   },
//   {
//     id: "3",
//     name: "Spotted Mackerel Whole | 3.5 kg - 4 kg",
//     price: "$30",
//     description:
//       "Beef Sirloin is one of the two major subprimals of the beef loin primal cut, which runs from the 13th rib to the end of the hip bone.",
//     image:
//       "https://static.wixstatic.com/media/02eae1_ed0bd92fecf546a98cb62a2138e16931~mv2.png/v1/fill/w_316,h_236,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/02eae1_ed0bd92fecf546a98cb62a2138e16931~mv2.png",
//   },
//   {
//     id: "4",
//     name: "Spotted Mackerel Whole | 3.5 kg - 4 kg",
//     price: "$30",
//     description:
//       "Beef Sirloin is one of the two major subprimals of the beef loin primal cut, which runs from the 13th rib to the end of the hip bone.",
//     image:
//       "https://static.wixstatic.com/media/ffc7d7_de413b9147d04a05b93286410b0522d8~mv2.jpg/v1/fill/w_316,h_236,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ffc7d7_de413b9147d04a05b93286410b0522d8~mv2.jpg",
//   },
//   {
//     id: "5",
//     name: " Mackerel Whole | 3.5 kg - 4 kg",
//     price: "$30",
//     image:
//       "https://static.wixstatic.com/media/02eae1_94b681f4e0d24ec68617ff1447e919ef~mv2.jpg/v1/fill/w_316,h_236,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/02eae1_94b681f4e0d24ec68617ff1447e919ef~mv2.jpg",
//   },
//   {
//     id: "6",
//     name: "Spotted Mackerel Whole | 3.5 kg - 4 kg",
//     price: "$30",
//     description:
//       "Beef Sirloin is one of the two major subprimals of the beef loin primal cut, which runs from the 13th rib to the end of the hip bone.",
//     image:
//       "https://static.wixstatic.com/media/ffc7d7_667c3cf1969d4cbdb2ec8cef996bf277~mv2.jpg/v1/fill/w_316,h_236,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ffc7d7_667c3cf1969d4cbdb2ec8cef996bf277~mv2.jpg",
//   },
//   {
//     id: "8",
//     name: "Pork Bone",
//     price: "$30",
//     description:
//       "Beef Sirloin is one of the two major subprimals of the beef loin primal cut, which runs from the 13th rib to the end of the hip bone.",
//     image:
//       "https://static.wixstatic.com/media/ffc7d7_ff5250d88e554188bb54e8ae954604df~mv2.jpg/v1/fill/w_316,h_236,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ffc7d7_ff5250d88e554188bb54e8ae954604df~mv2.jpg",
//   },
// ];

// export default products;


const options = { method: 'GET' };

const products = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/v2/storefront/products', options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export default products;

