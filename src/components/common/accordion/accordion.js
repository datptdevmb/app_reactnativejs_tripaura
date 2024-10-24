import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Accordion = ({ title, sections }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
            {/* Phần tiêu đề của Accordion */}
            <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
                <Text style={styles.arrow}>
                    {isExpanded ? '▲' : '▼'}
                </Text>
            </TouchableOpacity>

            {/* Nội dung mở rộng với tiêu đề phụ */}
            {isExpanded && (
                <View style={styles.content}>
                    {sections.map((section, index) => (
                        <View key={index} style={styles.subSection}>
                            {/* Tiêu đề phụ */}
                            {section.subHeader && <Text style={styles.subHeader}>{section.subHeader}</Text>}
                            {/* Nội dung của mỗi phần */}
                            {Array.isArray(section.content) && section.content.map((item, i) => (
                                <Text key={i} style={styles.bulletPoint}>{item}</Text>
                            ))}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginStart: 5,
    },
    arrow: {
        fontSize: 16,  
    },
    content: {
        marginTop: 10,
        paddingHorizontal: 5,
    },
    subSection: {
        marginBottom: 10,
    },
    subHeader: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5,
    },
    bulletPoint: {
        fontSize: 14,
        marginBottom: 5,
    },
});

export default Accordion;