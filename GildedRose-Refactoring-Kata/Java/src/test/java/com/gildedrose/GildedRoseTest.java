package com.gildedrose;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GildedRoseTest {
    // All items have SellIn (days to sell)
    // @Test
    void allItems_haveSellInValueThatDecreasesBy1EachDay() {

        Item item = new Item("+5 Dexterity Vest", 10, 20);
        GildedRose app = new GildedRose(new Item[]{item});
        app.updateQuality();
        assertEquals(9, item.sellIn, "SellIn should decrease by 1 each day");
    }

    // All items have Quality value (value/condition)
    @Test
    void allItems_haveQualityValueThatChangesDaily() {

        Item item = new Item("+5 Dexterity Vest", 10, 20);
        GildedRose app = new GildedRose(new Item[]{item});
        app.updateQuality();
        assertEquals(19, item.quality, "Quality should decrease by 1 each day for normal items");
    }

    // Once the sell by date has passed, Quality degrades twice as fast
    @Test
    void normalItem_qualityDegradesTwiceAsFastAfterSellDate() {

        Item item = new Item("+5 Dexterity Vest", 0, 10);
        GildedRose app = new GildedRose(new Item[]{item});
        app.updateQuality();
        assertEquals(8, item.quality, "Quality should drop by 2 after sell date passes");
    }

    // "Aged Brie" actually increases in Quality the older it gets
    @Test
    void agedBrie_increasesInQualityEachDay() {
        Item item = new Item("Aged Brie", 10, 10);
        GildedRose app = new GildedRose(new Item[]{item});
        app.updateQuality();
        assertEquals(9, item.sellIn);
        assertEquals(11, item.quality, "Aged Brie should increase in quality by 1 per day");
    }

    // The Quality of an item is never more than 50
    @Test
    void qualityNeverExceeds50() {
        Item item = new Item("Aged Brie", 5, 50);
        GildedRose app = new GildedRose(new Item[]{item});
        app.updateQuality();
        assertEquals(50, item.quality, "Quality should never exceed 50");
    }

    // "Sulfuras" never has to be sold or decreases in Quality
    @Test
    void sulfuras_neverDecreasesInSellInOrQuality() {
        Item item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
        GildedRose app = new GildedRose(new Item[]{item});
        app.updateQuality();
        assertEquals(0, item.sellIn);
        assertEquals(80, item.quality);
    }

    // "Backstage passes" increases in Quality as it approaches SellIn
    @Test
    void backstage_increasesBy1WhenMoreThan10Days() {
        Item item = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20);
        GildedRose app = new GildedRose(new Item[]{item});
        app.updateQuality();
        assertEquals(14, item.sellIn);
        assertEquals(21, item.quality, "Quality should increase by 1 when sellIn > 10");
    }
    @Test
    void backstage_increasesBy2When10DaysOrLess() {
        Item item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25);
        GildedRose app = new GildedRose(new Item[]{item});
        app.updateQuality();
        assertEquals(9, item.sellIn);
        assertEquals(27, item.quality, "Quality should increase by 2 when sellIn <= 10");
    }
    @Test
    void backstage_increasesBy3When5DaysOrLess() {
        Item item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 25);
        GildedRose app = new GildedRose(new Item[]{item});
        app.updateQuality();
        assertEquals(4, item.sellIn);
        assertEquals(28, item.quality, "Quality should increase by 3 when sellIn <= 5");
    }

    @Test
    void backstage_qualityDropsToZeroAfterConcert() {
        Item item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 25);
        GildedRose app = new GildedRose(new Item[]{item});
        app.updateQuality();
        assertEquals(-1, item.sellIn);
        assertEquals(0, item.quality, "Quality should drop to 0 after the concert (sellIn < 0)");
    }

    // "Conjured" items degrade in Quality twice as fast as normal items
    @Test
    void conjuredItem_qualityDecreasesTwiceAsFast() {
        Item item = new Item("Conjured Mana Cake", 3, 6);
        GildedRose app = new GildedRose(new Item[]{item});

        app.updateQuality();

        assertEquals(2, item.sellIn, "SellIn should decrease by 1");
        assertEquals(4, item.quality, "Conjured items should lose 2 quality per day");
    }

    // Once the sell by date has passed, Conjured items degrade twice as fast again (total 4 per day)
    @Test
    void conjuredItem_qualityDecreasesFourAfterSellDate() {
        Item item = new Item("Conjured Mana Cake", 0, 8);
        GildedRose app = new GildedRose(new Item[]{item});

        app.updateQuality();

        assertEquals(-1, item.sellIn);
        assertEquals(4, item.quality, "Conjured items should lose 4 quality per day after sell date");
    }

    // Quality of Conjured items never goes below 0
    @Test
    void conjuredItem_qualityNeverGoesBelowZero() {
        Item item = new Item("Conjured Mana Cake", 1, 1);
        GildedRose app = new GildedRose(new Item[]{item});

        app.updateQuality();

        assertEquals(0, item.quality, "Quality should not go below 0");
    }

}
