export default function getElementById(array, targetId) {
    // Search for the element with the matching _id

    const foundElement = array.find((element) => element._id === targetId);

    // If the element is found, return its dataset; otherwise, return null
    return foundElement ? foundElement : null;
}
