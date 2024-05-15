import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    tableCell: {
        padding: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    headerCell: {
        padding: 5,
        fontWeight: 'bold',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },

   
    downloadButton: {
        color: 'black',
        textDecoration: 'none',
        border: 'none',
        backgroundColor: 'wheat',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop:'20px',
        marginLeft:'40em',
        marginBottom:'5em',
        borderRadius:'30px',
        padding:'10px'
    },
});

const FeedbackPDF = ({ feedbacks }) => (
    <div className={styles.downloadContainer}>
        <PDFDownloadLink document={<FeedbackDocument feedbacks={feedbacks} />} fileName="feedback_report.pdf">
            {({ blob, url, loading, error }) => (
                <button style={styles.downloadButton} disabled={loading}>
                    {loading ? 'Generating PDF...' : 'Download PDF'}
                </button>
            )}
        </PDFDownloadLink>
    </div>
);

const FeedbackDocument = ({ feedbacks }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.header}>Feedback Report</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.headerCell, { width: '20%',fontSize: 15 }]}>Email</Text>
                    <Text style={[styles.tableCell, styles.headerCell, { width: '15%' ,fontSize: 15}]}>Type</Text>
                    <Text style={[styles.tableCell, styles.headerCell, { width: '15%' ,fontSize: 15}]}>Date</Text>
                    <Text style={[styles.tableCell, styles.headerCell, { width: '50%' ,fontSize: 15}]}>Description</Text>
                </View>
                {feedbacks.map((feedback, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={[styles.tableCell, { width: '20%', fontSize: 10 }]}>{feedback.email}</Text>
                        <Text style={[styles.tableCell, { width: '15%', fontSize: 10 }]}>{feedback.type}</Text>
                        <Text style={[styles.tableCell, { width: '15%', fontSize: 10 }]}>{feedback.date}</Text>
                        <Text style={[styles.tableCell, { width: '50%', fontSize: 10 }]}>{feedback.description}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);




export default FeedbackPDF;
