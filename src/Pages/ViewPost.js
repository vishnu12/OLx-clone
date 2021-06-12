import React from 'react'

import Header from '../Components/Header/Header'
import View from '../Components/View/View'

function ViewPost({match}) {
    return (
        <div>
            <Header />
            <View match={match}/>
        </div>
    )
}

export default ViewPost
