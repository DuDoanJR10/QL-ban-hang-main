const handleCount = (type, school, array) => {
    if (array.length != 0) {
        const itemLast = array[array.length - 1]
        const count = Number(itemLast[school].split(type)[1])
        return count + 1
    } else {
        return 1
    }
}

module.exports = { handleCount }