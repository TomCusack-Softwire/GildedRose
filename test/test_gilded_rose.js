let {expect} = require('chai');
let {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function () {

    /*
    it("should foo", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal("fixme");
    });
     */

    it("At the end of each day our system lowers both values for every item.", () => {
        const shop = new Shop([new Item("foo", 10, 10)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(9);
    });

    it("Once the sell by date has passed, quality degrades twice as fast.", () => {
        const shop = new Shop([new Item("foo", 0, 10)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(8);
    });

    it("The Quality of an item is never negative.", () => {
        const shop = new Shop([new Item("foo", 10, 0)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(0);
    });

    it("\"Aged Brie\" actually increases in Quality the older it gets.", () => {
        const shop = new Shop([new Item("Aged Brie", 10, 10)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(11);
    });

    it("The Quality of an item is never more than 50.", () => {
        const shop = new Shop([new Item("Aged Brie", 10, 50)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(50);
    });

    it("\"Sulfuras\", being a legendary item, never has to be sold or decreases in Quality.", () => {
        const shop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 10)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).to.equal(10);
        expect(items[0].quality).to.equal(10);
    });

    it("\"Backstage passes\", like aged brie, increases in Quality as its SellIn value approaches;", () => {
        const shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).to.equal(19);
        expect(items[0].quality).to.equal(11);
    });

    it("Quality increases by 2 when there are 10 days or less", () => {
        const shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(12);
    });

    it("and by 3 when there are 5 days or less", () => {
        const shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(13);
    });

    it("but Quality drops to 0 after the concert.", () => {
        const shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });

    it("\"Conjured\" items degrade in Quality twice as fast as normal items.", () => {
        const shop = new Shop([new Item("Conjured Mana Cake", 10, 10)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(8);
    });
});
