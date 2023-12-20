export function calculation(data) {
    
    const newData = data.map(item => ({ ...item }))
    newData.sort((a, b) => {
        return b.price - a.price;
    })

    let total = 0;
    newData.map(chico => total = total + Number(chico.price))

    let average = total / newData.length;

    for (let i = 0; i < newData.length; i++) {
        newData[i].deuda = newData[i].price - average;
    }

    let l = 0;
    let r = newData.length - 1;
    let result = []
    while (l < r) {

        if (newData[l].deuda > 0) {
            if (newData[l].deuda + newData[r].deuda >= 0) {
                result.push({
                    deudor: newData[r].name,
                    acreedor: newData[l].name,
                    importe: (newData[r].deuda).toFixed(2),
                    alias: newData[l].alias
                })
                newData[l].deuda = newData[l].deuda + newData[r].deuda;
                newData[r].deuda = newData[r].deuda + average > 0 ? 0 : newData[r].deuda + average;
                r--;
            } else {
                result.push({
                    deudor: newData[r].name,
                    acreedor: newData[l].name,
                    importe: (newData[l].deuda * -1).toFixed(2),
                    alias: newData[l].alias
                })
                newData[r].deuda = newData[r].deuda + newData[l].deuda;
                newData[l].deuda = 0;
                l++;
            }
        } else {
            r--;
        }

    }
    return result

}
