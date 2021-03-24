const initialState = {
    currentBoard: 0,
    boards: [
        {
            boardName: 'Kanban Board Demo',
            id: `board-${0}`,
            boardLists: [
                {
                    title: 'Demo board',
                    id: `list-${0}`,
                    cards: [
                        {
                            title: 'Demo Card',
                            id: `card-${0}`,
                            text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias beatae consequatur cumque delectus distinctio eum excepturi expedita fugiat ipsa itaque maiores maxime minima neque nobis odit optio quaerat, quasi qui rem repellendus sapiente similique sint tempore temporibus voluptas voluptatibus voluptatum? Blanditiis enim laboriosam maiores odio omnis quia ullam? Consectetur!`,
                            list: [
                                {
                                    text: 'Lorem ipsum dolor',
                                    id: `item-${0}`,
                                    check: false
                                },
                                {
                                    text: 'Sit amet, consectetur',
                                    id: `item-${1}`,
                                    check: true
                                },
                                {
                                    text: 'Adipisicing elit.',
                                    id: `item-${2}`,
                                    check: false
                                },
                                {
                                    text: 'Eius, quasi.',
                                    id: `item-${3}`,
                                    check: false
                                },
                            ],
                            comments: [
                                'Comments Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                                'Accusantium alias beatae consequatur cumque delectus distinctio eum excepturi expedita fugiat ipsa itaque maiores maxime minima neque nobis odit optio quaerat, quasi qui rem repellendus sapiente similique sint tempore temporibus voluptas voluptatibus voluptatum?',
                                'Blanditiis enim laboriosam maiores odio omnis quia ullam? Consectetur!'
                            ],
                        },
                        {
                            title: 'Second Demo Card',
                            id: `card-${1}`,
                            text: ``,
                        },
                    ],
                },
                {
                    title: 'Second Demo Board',
                    id: `list-${1}`,
                    cards: [
                        {
                            title: 'Third Demo Card',
                            id: `card-${2}`,
                            text: ``
                        }
                    ]
                }
            ]
        }
    ]
};

export default initialState;