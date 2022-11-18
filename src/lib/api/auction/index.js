import { listingStore } from "../../../stores/listing"
import { API_LISTINGS } from "../environment"

async function getListings() {
  const url = new URL(API_LISTINGS)
  const response = await fetch(url)
  return await response.json()
}

function listing(id) {
  const token = JSON.parse(localStorage.getItem('token'))

  async function getListing() {
    const url = new URL(`${API_LISTINGS}/${id}`)
    url.searchParams.append("_bids", "true")
    url.searchParams.append("_seller", "true")
    const response = await fetch(url)
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.errors.slice(-1)[0].message)
    }
    const result = await response.json()
    listingStore.set(result);
    return result;
  }

  async function createListing(title, description, media, endsAt, tags) {
    tags = tags.split(",").map(tag => tag.trim())
    media = media.split(",").map(media => media.trim())
    const response = await fetch(API_LISTINGS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        media,
        endsAt,
        tags,
      }),
    })
    return await response.json()
  }

  async function updateListing(title, description, media, tags) {
    const response = await fetch(`${API_LISTINGS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        media,
        tags,
      }),
    })
    return await response.json()
  }

  async function delist() {
    const url = new URL(`${API_LISTINGS}/${id}`)
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return await response.json()
  }

  async function bid(amount) {
    const response = await fetch(`${API_LISTINGS}/${id}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: Number(amount),
      }),
    })
    return await response.json()
  }

  return {
    details: getListing,
    publish: createListing,
    edit: updateListing,
    delist,
    bid,
  }
}

export default {
  listing: listing,
  listings: getListings,
}
