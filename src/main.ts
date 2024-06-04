import { men, women } from "./people"

export const main = () => {
    let count: number = 0
    while (true) {
        count++
        let singleNum: number = 0

        console.log(`マッチング${count}回目`)

        //独身がいるかどうか
        men.forEach((item) => {
            if (item.pair === -1) singleNum++
        })

        //終了
        if (singleNum === 0) {
            console.log("ペアの作成が終わりました。")
            men.forEach((item) => {
                console.log(
                    `${item.name}は${women[item.pair].name}とくっつきました。`
                )
            })

            return
        }

        for (let i = 0; i < 1; i++) {
            const menRandom = Math.floor(Math.random() * men.length)

            if (men[menRandom].pair !== -1) {
                i--
            } else {
                const womenRandom = Math.floor(Math.random() * women.length)

                console.log(
                    `${men[menRandom].name}は${women[womenRandom].name}にアタックしました。`
                )

                if (women[womenRandom].pair === -1) {
                    //女性が独身だった場合は確定で！
                    men[menRandom].pair = womenRandom
                    women[womenRandom].pair = menRandom

                    const matchProbability = Math.random()

                    men[menRandom].matchProbability = matchProbability
                    women[womenRandom].matchProbability = matchProbability

                    console.log(
                        `${men[menRandom].name}は${women[womenRandom].name}と付き合いました。`
                    )
                } else {
                    const matchProbability = Math.random()

                    if (
                        women[womenRandom].matchProbability > matchProbability
                    ) {
                        console.log(
                            `${women[womenRandom].name}は${men[menRandom].name}のアプローチに負けて付き合うことになりました。`
                        )
                        console.log(
                            `${men[women[womenRandom].pair].name}は${
                                women[womenRandom].name
                            }とお別れしました。`
                        )

                        men[menRandom].pair = womenRandom
                        men[menRandom].matchProbability = matchProbability

                        men[women[womenRandom].pair].pair = -1
                        men[women[womenRandom].pair].matchProbability = 0

                        women[womenRandom].pair = menRandom
                    } else {
                        console.log(
                            `${women[womenRandom].name}は${
                                men[women[womenRandom].pair].name
                            }とラブラブなため断られてしまいました。`
                        )
                        console.log(
                            `${men[menRandom].name}は${women[womenRandom].name}を諦めました`
                        )
                    }
                }

                console.log(`\n`)
            }
        }
    }
}
