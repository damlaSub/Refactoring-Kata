package com.gildedrose;

class GildedRose {
    Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {
        for (Item item : items) {
            ItemNames type = ItemNames.from(item.name);
            if (type == ItemNames.AGED_BRIE){
                AgedBrieUpdater updater = new AgedBrieUpdater();
                updater.update(item);
            } else if(type == ItemNames.BACKSTAGE_PASS){
                BackstagePassesUpdater updater = new BackstagePassesUpdater();
                updater.update(item);
            } else if (type == ItemNames.SULFURAS)   {
                SulfurasUpdater  updater = new SulfurasUpdater();
                updater.update(item);
            } else if(type == ItemNames.CONJURED){
                ConjuredUpdater updater = new ConjuredUpdater();
                updater.update(item);
            }else {
                CommonItemUpdater updater = new CommonItemUpdater();
                updater.update(item);
            }
        }
    }
}
