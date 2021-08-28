import React from "react";
import { ClassAutoComplete } from "../components/ClassAutoComplete";
import { FunctionalAutoComplete } from "../components/FunctionalAutoComplete";
import "./styles.css"

export const View = () => {
    return (
        <div className={'view'}>
            <div className={'container'}>
                <h3>This is the Class Based Component Auto Complete</h3>
                <ClassAutoComplete />
            </div>

            <div className={'container'}>
                <h3>This is the Functional Component Auto Complete</h3>
                <FunctionalAutoComplete />
            </div>
        </div>
    )
}
