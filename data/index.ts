import { Product } from "@/interfaces";

export const products: Product[] = [
    {
        id: "1",
        title: "Car Portable Vacuum Cleaner",
        description: "Keep your car clean and tidy with this portable vacuum cleaner. It's lightweight and easy to use, making it perfect for everyday use. The vacuum cleaner comes with a range of attachments to help you clean hard-to-reach areas, and it's powered by your car's cigarette lighter socket, so you can use it wherever you go. Whether you're cleaning up crumbs from the kids or getting rid of pet hair, this vacuum cleaner is the perfect tool for the job. Order yours today!",
        images: [
            "/images/Car-vacuum-1.jpg",
            "/images/Car-vacuum-2.jpg",
            "/images/Car-vacuum-3.jpg"
        ],
        inStock: 50,
        price: 50000,
        slug: "car-portable-vacuum-cleaner",
    },
    {
        id: "2",
        title: "Car Electric Pressure Washer",
        description: "Keep your car looking its best with this electric pressure washer. It's perfect for cleaning your car's exterior, removing dirt, grime, and other debris with ease. The pressure washer is lightweight and portable, making it easy to use wherever you go. It's powered by electricity and two powerful battries, so you can use it without worrying about running out of power. Whether you're cleaning your car, your driveway, or your patio, this pressure washer is the perfect tool for the job. Order yours today!",
        images: [
            "/images/Car-pressure-washer-1.JPG",
            // "/images/Car-pressure-washer-2.jpg",
            // "/images/Car-pressure-washer-3.jpg"
        ],
        inStock: 50,
        price: 100000,
        slug: "car-electric-pressure-washer",
    },
];