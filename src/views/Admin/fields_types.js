const fields_types = {
    anime: {
        id: {
            type: "int",
            nullable: true,
            primary: true
        },
        new_id: {
            type: "int",
            scope: "update",
            placeholder: "Если необходимо изменить id"
        },
        series: {
            type: "str",
            nullable: true
        },
        name: {
            type: "str",
            nullable: false
        },
        link: {
            type: "str",
            nullable: true,
            placeholder: "Вычислится автоматически, если используется MAL ID"
        },
        type: {
            type: "str",
            nullable: true,
            placeholder: "Вычислится автоматически, если используется MAL ID"
        },
        episodes: {
            type: "int",
            nullable: true,
            placeholder: "Вычислится автоматически, если используется MAL ID"
        },
        picture: {
            type: "str",
            nullable: true,
            placeholder: "Вычислится автоматически, если используется MAL ID"
        },
        picture_mode: {
            type: "str",
            nullable: false,
            placeholder: "Автоматически подставится portrait если не передано, или landscape"
        },
        status: {
            type: "str",
            nullable: true
        },
        score: {
            type: "float",
            nullable: true
        },
        comment: {
            type: "str",
            nullable: true
        },
        voice_acting: {
            type: "str",
            nullable: true
        },
        order_by: {
            type: "str",
            nullable: true
        },
        added_time: {
            type: "datetime",
            nullable: true,
            placeholder: "Автоматически подставится текущее, если пустое"
        },
        completed_time: {
            type: "datetime",
            nullable: true,
            placeholder: "Автоматически подставится текущее, если пустое"
        }
    },
    auctions: {
        id: {
            type: "int",
            nullable: false,
            primary: true
        },
        name: {
            type: "str",
            nullable: false
        },
        date: {
            type: "date",
            nullable: true
        },
        description: {
            type: "str",
            nullable: true
        },
        comment: {
            type: "str",
            nullable: true
        },
        status: {
            type: "str",
            nullable: true
        },
        picture: {
            type: "str",
            nullable: true
        },
        order: {
            type: "int",
            nullable: true
        },
        order_by: {
            type: "str",
            nullable: true
        },
        auction_id: {
            type: "int",
            nullable: true,
            placeholder: "Пустое поле для аукционов и id для элементов аукциона"
        }
    },
    challenges: {
        id: {
            type: "int",
            nullable: false,
            primary: true
        },
        name: {
            type: "str",
            nullable: false
        },
        picture: {
            type: "str",
            nullable: true,
        },
        picture_mode: {
            type: "str",
            nullable: false,
            placeholder: "Автоматически подставится landscape если не передано, или portrait"
        },
        order_by: {
            type: "str",
            nullable: true
        },
        description: {
            type: "str",
            nullable: true
        },
        comment: {
            type: "str",
            nullable: true
        },
        status: {
            type: "str",
            nullable: true
        },
        type: {
            type: "str",
            nullable: true
        },
        price: {
            type: "str",
            nullable: true
        },
        records: {
            type: "json",
            nullable: true
        }
    },
    cinema: {
        id: {
            type: "int",
            nullable: false,
            primary: true
        },
        name: {
            type: "str",
            nullable: false
        },
        subname: {
            type: "str",
            nullable: false,
            placeholder: "Внутреннее дополнительное имя для сортировки"
        },
        type: {
            type: "str",
            nullable: false
        },
        event: {
            type: "str",
            nullable: true
        },
        comment: {
            type: "str",
            nullable: true
        },
        date: {
            type: "date",
            nullable: true
        },
        status: {
            type: "str",
            nullable: true
        },
        order_by: {
            type: "str",
            nullable: true
        }
    },
    credits: {
        id: {
            type: "int",
            nullable: false,
            primary: true
        },
        name: {
            type: "str",
            nullable: false
        },
        description: {
            type: "str",
            nullable: true
        },
        picture: {
            type: "str",
            nullable: true
        },
        picture_size: {
            type: "str",
            nullable: true,
            placeholder: "Пусто, full, medium или small"
        },
        picture_original: {
            type: "str",
            nullable: true
        },
        creators: {
            type: "json",
            nullable: true
        },
        order: {
            type: "int",
            nullable: true
        }
    },
    data_params: {
        id: {
            type: "int",
            nullable: false
        },
        name: {
            type: "str",
            nullable: false,
            primary: true
        },
        value_bool: {
            type: "bool",
            nullable: true
        },
        value_int: {
            type: "int",
            nullable: true
        },
        value_float: {
            type: "float",
            nullable: true
        },
        value_str: {
            type: "str",
            nullable: true
        },
    },
    games: {
        id: {
            type: "int",
            nullable: true,
            primary: true
        },
        new_id: {
            type: "int",
            scope: "update",
            placeholder: "Если необходимо изменить id"
        },
        name: {
            type: "str",
            nullable: false
        },
        subname: {
            type: "str",
            nullable: false,
            placeholder: "Внутреннее дополнительное имя для сортировки"
        },
        link: {
            type: "str",
            nullable: true,
            placeholder: "Вычислится автоматически, если используется STEAM ID"
        },
        picture: {
            type: "str",
            nullable: true,
            placeholder: "Вычислится автоматически, если используется STEAM ID"
        },
        picture_mode: {
            type: "str",
            nullable: false,
            placeholder: "Автоматически подставится landscape если не передано, или portrait"
        },
        status: {
            type: "str",
            nullable: true
        },
        genre: {
            type: "str",
            nullable: true
        },
        type: {
            type: "str",
            nullable: true
        },
        records: {
            type: "json",
            nullable: true
        },
        comment: {
            type: "str",
            nullable: true
        },
        gift_by: {
            type: "str",
            nullable: true
        },
        order_by: {
            type: "str",
            nullable: true
        },
    },
    lore: {
        id: {
            type: "int",
            nullable: false,
            primary: true
        },
        text: {
            type: "str",
            nullable: false
        },
        block_id: {
            type: "str",
            nullable: true
        },
        order: {
            type: "int",
            nullable: true,
            placeholder: "Автоматически подставится в конец, если не передано"
        },
    },
    marathons: {
        id: {
            type: "int",
            nullable: false,
            primary: true
        },
        name: {
            type: "str",
            nullable: false
        },
        description: {
            type: "str",
            nullable: true
        },
        comment: {
            type: "str",
            nullable: true
        },
        status: {
            type: "str",
            nullable: true
        },
        date_start: {
            type: "date",
            nullable: true
        },
        date_end: {
            type: "date",
            nullable: true
        },
        picture: {
            type: "str",
            nullable: true
        },
        picture_mode: {
            type: "str",
            nullable: false,
            placeholder: "Автоматически подставится landscape если не передано, или portrait"
        },
        rules: {
            type: "json",
            nullable: true
        },
        records: {
            type: "json",
            nullable: true
        },
        order: {
            type: "int",
            nullable: true,
            placeholder: "Автоматически подставится в конец, если не передано"
        },
        link: {
            type: "str",
            nullable: true,
            placeholder: "Вычислится автоматически, если передан STEAM ID"
        },
        marathon_id: {
            type: "int",
            nullable: true,
            placeholder: "Пустое поле для марафонов и id для элементов марафона"
        },
        steam_id: {
            type: "int",
            nullable: true,
            placeholder: "STEAM ID для steam игр"
        }
    },
    merch: {
        id: {
            type: "int",
            nullable: false,
            primary: true
        },
        name: {
            type: "str",
            nullable: false
        },
        description: {
            type: "str",
            nullable: true
        },
        price: {
            type: "str",
            nullable: true
        },
        status: {
            type: "str",
            nullable: true
        },
        creator_name: {
            type: "str",
            nullable: true
        },
        creator_link: {
            type: "str",
            nullable: true
        },
        picture: {
            type: "str",
            nullable: true
        },
        picture_size: {
            type: "str",
            nullable: true,
            placeholder: "Пусто, full, medium или small"
        },
        order: {
            type: "int",
            nullable: true,
            placeholder: "Автоматически подставится в конец, если не передано"
        },
    },
    roulette: {
        id: {
            type: "int",
            nullable: false,
            primary: true
        },
        name: {
            type: "str",
            nullable: false
        },
        rarity: {
            type: "str",
            nullable: false
        },
        description: {
            type: "str",
            nullable: true
        },
    },
    socials: {
        id: {
            type: "int",
            nullable: false,
            primary: true
        },
        name: {
            type: "str",
            nullable: false
        },
        link: {
            type: "str",
            nullable: false
        },
        icon: {
            type: "str",
            nullable: false
        },
        type: {
            type: "str",
            nullable: true
        },
        order: {
            type: "int",
            nullable: false,
            placeholder: "Автоматически подставится в конец, если не передано"
        },
    }
};

export default fields_types;