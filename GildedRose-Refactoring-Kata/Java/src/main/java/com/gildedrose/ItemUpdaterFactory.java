package com.gildedrose;

import java.util.HashMap;
import java.util.Map;

public class ItemUpdaterFactory {

    private static final Map<ItemNames, Updater> Updaters = new HashMap<ItemNames, Updater>();

    static {
        Updaters.put(ItemNames.AGED_BRIE, new AgedBrieUpdater());
        Updaters.put(ItemNames.BACKSTAGE_PASS, new BackstagePassesUpdater());
        Updaters.put(ItemNames.SULFURAS, new SulfurasUpdater());
        Updaters.put(ItemNames.CONJURED, new ConjuredUpdater());
        Updaters.put(ItemNames.OTHER, new CommonItemUpdater());

    }
    public static Updater getUpdater(ItemNames type) {
        return Updaters.getOrDefault(type, Updaters.get(ItemNames.OTHER));
    }
}
