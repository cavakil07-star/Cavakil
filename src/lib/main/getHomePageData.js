import axios from "axios";
// import clientPromise from "../mongodbClient";

// export async function getServices() {
//     try {
//         const client = await clientPromise;
//         const db = client.db();
//         return await db.collection("services").find({}).toArray();
//     } catch (e) {
//         console.error(e);
//         return [];
//     }
// }

// export async function getCategories() {
//     try {
//         const client = await clientPromise;
//         const db = client.db();
//         return await db.collection("categories").find({}).toArray();
//     } catch (e) {
//         console.error(e);
//         return [];
//     }
// }

// export async function getHomePageData() {
//     try {
//         const [services, categories] = await Promise.all([
//             getServices(),
//             getCategories()
//         ]);

//         return {
//             services: JSON.parse(JSON.stringify(services)),
//             categories: JSON.parse(JSON.stringify(categories))
//         };
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return { services: [], categories: [] };
//     }
// }

// export const getServices = async () => {
//     try {
//         const data = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/web/services`,
//             {
//                 headers: {
//                     "Cache-Control": "no-store"
//                 }
//             }
//         )
//         return data.data || [];
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const getCategories = async () => {
//     try {
//         const data = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/web/categories`,
//             {
//                 headers: {
//                     "Cache-Control": "no-store"
//                 }
//             }
//         )
//         return data.data || [];
//     } catch (error) {
//         console.log(error)
//     }
// }

export const getServices = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/web/services`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch services');
        }

        const data = await res.json();
        return data || { data: [] };
    } catch (error) {
        console.log('Error fetching services:', error);
        return { data: [] };
    }
};

export const getCategories = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/web/categories`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch categories');
        }

        const data = await res.json();
        return data || { data: [] };
    } catch (error) {
        console.log('Error fetching categories:', error);
        return { data: [] };
    }
};





// export async function getHomePageData() {
//     try {
//         const [servicesRes, categoriesRes] = await Promise.all([
//             fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/services`, {
//                 next: { revalidate: 300 }
//             }),
//             fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`, {
//                 next: { revalidate: 300 }
//             })
//         ]);

//         if (!servicesRes.ok || !categoriesRes.ok) {
//             throw new Error('Failed to fetch data');
//         }

//         const services = await servicesRes.json();
//         const categories = await categoriesRes.json();

//         return { services, categories };
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return { services: [], categories: [] };
//     }
// }


