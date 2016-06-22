var filters = {
    /* click handler for a filter */
    onClick: function(e) {
        filters.select($(this));
        filters.updateFilterText();
        console.log(JSON.stringify(filters.getFilterState()));
    },
    /* Select any number of filters as specified by the selector 
       TODO: prevent impossible selections like select("#Charter, #FeederHS") */
    select: function(selector) {
        var category = $(selector).data("category"); // pull the category from the data-category attribute
        $(".filter[data-category="+category+"]").removeClass("selected"); //deselect every filter in this category
        $(selector).addClass("selected"); // select the clicked filter
    },
    /* Deactivate any number of filters as specified by the selector */
    deactivate: function(selector) {
        $(selector).removeClass("selected");
        $(selector).removeClass("active");
        $(selector).addClass("deactivated");
    },
    /* Activate any number of filters as specified by the selector */
    activate: function(selector) {
        $(selector).removeClass("deactivated");
        $(selector).addClass("active");
    },
    updateFilterText: function() {
        console.log("updateFilterText");
        // == displays current user filter selections as string in #filters-selections div
        var selectedFilterContainer = $("#filters-selections").children("h2");
        var selectedFilterText = "<span class='filterLabel'>Data for: </span>";

        var selections = filters.getFilterState();

        if(selections.expend) {
            selectedFilterText += selections.expend.filterText + " for";
        }
        if(selections.agency) {
            var agencyText = selections.agency.filterText;
            if(selections.levels) {
                // remove duplicate "Schools" when agency and level are selected
                agencyText = agencyText.replace("Schools", "");
            }
            selectedFilterText += " " + agencyText;
        }
        if(selections.levels) {
            selectedFilterText += " " + selections.levels.filterText;
        }
        if(selections.zones) {
            selectedFilterText += " by " + selections.zones.filterText;
        }
        $(selectedFilterContainer).addClass("filterList");
        $(selectedFilterContainer).html(selectedFilterText);
    },
    /* Get the current state of the filters as a javascript object */
    getFilterState: function() {
        var filterState = {};
        $(".filter.selected").each(function(i, filter) {
            var category = $(filter).data("category");
            filterState[category] = {
                id: filter.id,
                filterText: $(filter).data("filter-text")
            };
        });
        return filterState;
    }
};

$(document).ready(function(){
    $(".filter:not(.deactivated)").on("click", filters.onClick);

    $("#FeederHS:not(.deactivated)").on("click", function() {
        // if the FeederHS zones option is selected, deactivate Charter and All on the agency level
        if($(".selected[data-category=agency]").length > 0) {
            // if there is already a selection at the agency level, switch it to District
            filters.select("#District");
        }
        filters.deactivate("#Charter, #All");
        filters.updateFilterText();
    });

    $("#Ward:not(.deactivated)").on("click", function() {
        // if the Ward zones are selected, re-activate Charter and All on the agency level
        filters.activate("#Charter, #All");
        filters.updateFilterText();
    });

    $("#Charter:not(.deactivated)").on("click", function() {
        // if the Charter agency is selected, deactivate the FeederHS zones option
        if($(".selected[data-category=zones]").length > 0) {
            // if there is already a selection at the zones level, switch it to Ward
            filters.select("#Ward");
        }
        filters.deactivate("#FeederHS");
    });

    $("[data-category=agency]:not(#Charter)").on("click", function() {
        // if an agency is selected other than Charter, reactivate FeederHS
        filters.activate("#FeederHS");
    });
});