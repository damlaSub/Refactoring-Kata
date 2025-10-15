package com.gildedrose;

public class CommonItemUpdater implements Updater {
    @Override
    public void update(Item item) {
        decreaseQuality(item);
        item.sellIn--;
        if (item.sellIn < 0){
            decreaseQuality(item);
        }
    }
    void decreaseQuality(Item item){
        if (item.quality > 0) {
            item.quality--;
        }
    }
}
