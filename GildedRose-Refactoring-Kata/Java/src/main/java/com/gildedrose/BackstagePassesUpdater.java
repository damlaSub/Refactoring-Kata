package com.gildedrose;

public class BackstagePassesUpdater implements Updater{
    @Override
    public void update(Item item) {
        increaseQuality(item);
        if (item.sellIn <6) {
            increaseQuality(item);
            increaseQuality(item);
        } else if(item.sellIn <11) {
            increaseQuality(item);
        }
        item.sellIn--;
        if (item.sellIn < 0){
            item.quality = 0;
        }
    }
    void increaseQuality(Item item){
        if (item.quality < 50) {
            item.quality++;
        }
    }
}
