namespace Van
module TimelineElementTask =

    open Van.TimelineElement
    open Van.TimelineElementNullable
    open System

    let taskT =
        fun coreTask ->
            fun taskStart ->
                let taskResult = Timeline Null
                let task = coreTask taskResult
                taskStart
                |> bindTN task
                |> ignore
                taskResult
    //--------------------------
    let (+>) =
        fun task1 task2 ->
            fun taskResult previousResult ->
                task1 taskResult previousResult
                |> taskT task2
