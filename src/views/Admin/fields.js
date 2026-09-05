const fields = {
    anime: [
        "id",
        "series",
        "name",
        "link",
        "type",
        "episodes",
        "picture",
        "picture_mode",
        "status",
        "score",
        "comment",
        "voice_acting",
        "order_by",
        "added_time",
        "completed_time"
    ],
    auctions: [
        "id",
        "name",
        "date",
        "description",
        "comment",
        "status",
        "picture",
        "order",
        "order_by",
        "auction_id"
    ],
    challenges: [
        "id",
        "name",
        "picture",
        "picture_mode",
        "order_by",
        "description",
        "comment",
        "status",
        "type",
        "price",
        "records"
    ],
    cinema: [
        "id",
        "name",
        "subname",
        "type",
        "event",
        "comment",
        "date",
        "status",
        "order_by"
    ],
    credits: [
        "id",
        "name",
        "description",
        "picture",
        "picture_size",
        "picture_original",
        "creators",
        "order"
    ],
    games: [
        "id",
        "name",
        "subname",
        "link",
        "picture",
        "picture_mode",
        "status",
        "genre",
        "type",
        "records",
        "comment",
        "gift_by",
        "order_by"
    ],
    lore: [
        "id", "text", "block_id", "order"
    ],
    marathons: [
        "id",
        "name",
        "description",
        "comment",
        "status",
        "date_start",
        "date_end",
        "picture",
        "picture_mode",
        "rules",
        "records",
        "order",
        "link",
        "marathon_id",
        "steam_id"
    ],
    merch: [
        "id",
        "name",
        "description",
        "price",
        "status",
        "creator_name",
        "creator_link",
        "picture",
        "picture_size",
        "order"
    ],
    roulette: [
        "id", "name", "rarity", "description"
    ],
    socials: [
        "id", "name", "link", "icon", "type", "order"
    ]
};

export default fields;
