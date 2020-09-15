import axios from "axios";

export interface Product {
  id: string;
  updated_at: Date;
  image: string;
  name: string;
  description: string;
  visibility: "PRIVATE" | "PUBLIC";
  price: number;
  currency: string;
}

// backend
export class Client {
  access_token: string;
  base_url: string;
  constructor({ access_token }) {
    this.access_token = access_token;

    this.base_url = "https://connect.squareupsandbox.com/v2/";
    axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    axios.defaults.headers["Content-type"] = "application/json";
    axios.defaults.headers["Square-Version"] = "2020-07-22";
  }

  getImageURLFromID(image_id, imageData) {
    return imageData.filter((image) => image.id === image_id)[0].image_data.url;
  }

  formatRawProductData(rawProductData): Promise<Product[]> {
    const items = rawProductData.filter((prod) => prod.type === "ITEM");
    const images = rawProductData.filter((prod) => prod.type === "IMAGE");

    const result = items.map((item) => {
      const itemData = item.item_data;
      const itemVariationData = itemData.variations[0].item_variation_data;
      const updatedAt = itemData.variations[0].updated_at;

      if (itemVariationData.pricing_type === "VARIABLE_PRICING") {
        throw new Error(
          "variation pricing not supported. please fix item catalog in Square app."
        );
      }

      return {
        id: item.id,
        variation_id: itemData.id,
        name: itemData.name,
        description: itemData.description,
        image: this.getImageURLFromID(item.image_id, images),
        price: itemVariationData.price_money.amount,
        currency: itemVariationData.price_money.currency,
        visibility: itemData.visibility,
        updated_at: updatedAt,
      };
    });
    return result;
  }

  products() {
    return axios
      .get(this.base_url + "catalog/list?types=ITEM%2CIMAGE")
      .then((result) => this.formatRawProductData(result.data.objects));
  }

  locations() {
    return axios
      .get(this.base_url + "locations")
      .then((result) => result.data.locations);
  }

  checkout(locationId) {
    return axios.get(this.base_url + "locations/" + locationId + "/checkouts");
  }

  createCheckoutURL() {
    return this.locations().then((locationResult) => {
      console.log("locations!!", locationResult);
      const locationId = locationResult[0].id; // dunno why we would have multiple locations?
      return this.checkout(locationId).then((result) => {
        console.log("my result!", result);
        return result;
      });
    });
  }

  cartInit() {
    "https://developer.squareup.com/reference/square/orders-api";
  }

  see() {
    console.log("access token!", this.access_token);
  }
}
