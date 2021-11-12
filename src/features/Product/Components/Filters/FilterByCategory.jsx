import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box} from '@mui/system';
import catergoryApi from 'api/categoryApi';
import { Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme =>({
    root: {
        padding: theme.spacing(2)
    },

    menu: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',

        '& > li':{
            marginTop: theme.spacing(1),
            transition: 'all .25s',
            '&:hover':{
                color: theme.palette.primary.main,
                cursor: 'pointer'
            }
        }
    }
}))


FilterByCategory.propTypes = {
    onChange: PropTypes.func,       
};

function FilterByCategory({onChange}) {
    const [categoryList, setCategoryList] = useState([]);
    const chasses = useStyles()

    useEffect(() => {
        (async () => {
            try{
                const list  = await catergoryApi.getAll()
                setCategoryList(
                    list.map((x) => ({
                        id: x.id,
                        name: x.name,
                    }))
                );
            } catch(error){
                console.log('Faild to fetch category list', error)
            }
        })();
    },[]);

    const handleCategoryClick = (category) => {
        if (onChange) {
            onChange(category)
        }
    };

    return (
        <Box className={chasses.root}>
            <Typography variant="subtitle2">Danh Mục Sản Phẩm </Typography>

            <ul className={chasses.menu}>
                {categoryList.map((category) => (
                <li key = {category.id} onClick = {() => handleCategoryClick(category.id)}>
                    <Typography variant="body2">{category.name}</Typography>
                </li>
                ))}
            </ul>
        </Box> 
    );
}

export default FilterByCategory;