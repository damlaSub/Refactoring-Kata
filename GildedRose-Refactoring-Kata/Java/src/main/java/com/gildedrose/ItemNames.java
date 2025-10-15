package com.gildedrose;

public enum ItemNames {
    AGED_BRIE("Aged Brie"),
    BACKSTAGE_PASS("Backstage passes to a TAFKAL80ETC concert"),
    SULFURAS("Sulfuras, Hand of Ragnaros"),
    CONJURED("Conjured Mana Cake"),
    OTHER("");

    private final String label;

    ItemNames(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }

    public static ItemNames from(String itemName) {
        for (ItemNames type : values()) {
            if (type.label.equals(itemName)) {
                return type;
            }
        }
        return OTHER;
    }
}
