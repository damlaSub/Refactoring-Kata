package com.gildedrose;

public class CommonItemUpdater implements Updater {
    @Override
    public void update(Item item) {
        decreaseQuality(item);
        item.sellIn--;
        decreaseQualityIfExpired(item);
    }
    void decreaseQuality(Item item){
        if (item.quality > 0) {
            item.quality--;
        }
    }
    void decreaseQualityIfExpired(Item item) {
        if (item.sellIn < 0){
            decreaseQuality(item);
        }
    }
}
