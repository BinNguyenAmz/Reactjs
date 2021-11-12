import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import FilterByCategory from './Filters/FilterByCategory';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,

};

function ProductFilters({filters, onChange}) {

    const  handleCatrgoryChange = (newCategoryId) => {
        if(!onChange) return;

        const newFilters =  {
            ...filters,
            "category.id": newCategoryId,
        };

        onChange(newFilters)    
    }

    return (
        <Box>
            <FilterByCategory onChange={handleCatrgoryChange}/>
        </Box>
    );
}

export default ProductFilters;