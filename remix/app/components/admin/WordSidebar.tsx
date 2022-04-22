import {
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField,
} from "@mui/material";
import { EnglishWord } from "@prisma/client";
import { useEffect, useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "@remix-run/react";

const WordSidebar = ({ englishWords }: { englishWords: EnglishWord[] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<EnglishWord[]>([]);

    useEffect(() => {
        const f = englishWords.filter((n) =>
            n.word.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(f);
    }, [englishWords, searchTerm]);

    return (
        <>
            <TextField
                value={searchTerm}
                variant="outlined"
                fullWidth
                label="Search"
                margin="dense"
                onChange={(event) => setSearchTerm(event.target.value)}
                InputProps={{
                    endAdornment: searchTerm ? (
                        <IconButton
                            size="small"
                            onClick={() => setSearchTerm("")}
                        >
                            <ClearIcon />
                        </IconButton>
                    ) : (
                        <SearchIcon className="pointer-events-none" />
                    ),
                }}
            />
            <List>
                {filteredData.map((n) => (
                    <NavLink
                        to={`/glossary/admin/${n.id}`}
                        className={({ isActive }) =>
                            isActive ? "bg-primary-500 block text-white" : ""
                        }
                        key={n.id}
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText>{n.word}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        </>
    );
};

export default WordSidebar;
