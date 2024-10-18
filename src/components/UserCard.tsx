import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Typography
} from '@mui/material';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
    cardStyles,
    cardHeaderStyles,
    dividerStyles,
    cardTypographyHeaderStyles,
    cardTypographyContentStyles
} from '../mui-styles/userCardStyles';
import { UserInfo } from '../interfaces/userInfo';
import Icon from './Icon';
import Button from './Button';
import { getTranslatedValueOrDateString } from '../utils/functions';

interface UserCardItemProps {
    title: string;
    value: string | Date;
    field?: keyof UserInfo;
    showHeader?: boolean;
    userInfo: UserInfo;
    handleEditClick: (field: keyof UserInfo) => void;
}

const UserCard: React.FC<UserCardItemProps> = ({
    title,
    value,
    field,
    showHeader = false,
    userInfo,
    handleEditClick,
}) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Card sx={cardStyles(theme)}>
            {showHeader ? (
                <>
                    <CardHeader
                        title={userInfo.emailVerified ? t('emailVerified') : t('emailNotVerified')}
                        avatar={
                            userInfo.emailVerified ?
                                <Icon name="checkCircle" /> :
                                <Icon name="cancelCircle" />
                        }
                        sx={cardHeaderStyles(theme, userInfo.emailVerified)}
                    />
                    <Divider sx={dividerStyles(theme)} />
                </>
            ) : null}
            <CardContent>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography sx={cardTypographyHeaderStyles(theme)} >{t(title)}</Typography>
                        <Typography sx={cardTypographyContentStyles(theme)}>
                            {getTranslatedValueOrDateString(value, t)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {field ?
                            <Button
                                label={t('modify')}
                                onClick={() => handleEditClick(field)}
                                icon={<Icon
                                    name='edit'
                                    htmlColor={theme.colors.text}
                                />}
                            /> :
                            null
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UserCard;