/** https://stackoverflow.com/a/1026087 */
export default function capitalizeFirstLetter(string) {
    console.log(string);
    if (string !== undefined)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else
    {
        return null;
    }
}