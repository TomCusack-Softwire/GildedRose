class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class Shop {
    constructor(items = []) {
        this.items = items;
    }

    // can change code below this line

    updateQuality() {
        for (let item of this.items) {
            // Sell In
            let changeInSellIn = (item.name === "Sulfuras, Hand of Ragnaros") ? 0 : -1;
            item.sellIn += changeInSellIn;

            // Quality
            let changeInQuality = -1;
            if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
                if (item.sellIn > 10) {
                    changeInQuality = 1;
                } else if (item.sellIn > 5) {
                    changeInQuality = 2;
                } else if (item.sellIn >= 0) {
                    changeInQuality = 3;
                } else {
                    changeInQuality = -item.quality;
                }
            } else if (item.name === "Aged Brie") {
                changeInQuality = 1;
            } else if (item.name === "Sulfuras, Hand of Ragnaros") {
                changeInQuality = 0;
            } else if (item.sellIn < 0 || item.name.startsWith("Conjured")) {
                changeInQuality = -2;
            }

            item.quality = Math.min(50, Math.max(0, item.quality + changeInQuality));
        }

        return this.items;
    }
}

module.exports = {
    Item,
    Shop
};
