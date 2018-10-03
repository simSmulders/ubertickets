
export const dummyComments = ["Fake ticket!", "Don't trust this seller", "FRAUD!", "IT'S A SCHEME!", "Very trustworthy!", "I want it!"]

export const calculatedRisk = (userAmount) => {
    let risk = 0
    if (userAmount.length === 1) {
        return risk + 10
    } else {
        return risk
    }
}

export const returnAverage = (tickets) => {
    let count = 0
    tickets.map(ticket => {
        return count += ticket.price
    })
    const average = count/tickets.length
    return average
}

export const riskOnAverage = (ticketPrice, average ) => {
    let risk = 0
    if (ticketPrice < average) {
        return risk += parseInt(((1 - (ticketPrice/average)) * 100),0)
    } else if (ticketPrice > average) {
         let reducedRisk = parseInt(((1 - (average/ticketPrice)) * 100),0)
            if (reducedRisk > 10) {
                return risk = -10
            } else {
                return risk = reducedRisk
            }
    }
}

export const commentsRisk = (dummyComments) => {
    let risk = 0
    if (dummyComments.length > 3) {
        return risk += 5
    } else {
        return risk
    }
}

export const timeRisk = (ticketPostDate) => {
    let risk = 0
    if (ticketPostDate < 9 || ticketPostDate > 17) {
        return risk += 10
    } else {
        return risk -= 10
    }
}

export const finalRisk = (totalRisk) => {
    if (totalRisk < 5) {
        return totalRisk = 5
    } else if (totalRisk > 95) {
        return totalRisk = 95
    } else {
        return totalRisk
    }
}