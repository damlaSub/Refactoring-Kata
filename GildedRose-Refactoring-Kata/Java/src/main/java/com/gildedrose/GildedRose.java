package com.gildedrose;

class GildedRose {
    Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {
        for (Item item : items) {
            ItemNames type = ItemNames.from(item.name);
            ItemUpdaterFactory factory = new ItemUpdaterFactory();
            factory.getUpdater(type).update(item);
         }
    }
}
